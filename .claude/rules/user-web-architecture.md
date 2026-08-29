# `apps/user-web` — Layout-Sliced Architecture

**The rule: the folder tree mirrors the page.** What you see in the browser you
find in the file tree by the same route — the header is in `header/`, the footer
is in `footer/`, and everything between them is in `main/`, split by page and
then by section. A bug in the hero title is in exactly one folder, and you get
there without a project-wide search.

This document is authoritative for `apps/user-web`. It refines
`.claude/rules/architecture.md` (the general monorepo rule). It does **not**
apply to `apps/admin-web` — see §17.

---

## 1. The pattern

**Layout-Sliced Architecture (LSA)** — our name for a simplified
[Feature-Sliced Design](https://feature-sliced.design), where the top-level
slices come from the page layout instead of the domain.

| Layer         | FSD equivalent | Here                                 |
| ------------- | -------------- | ------------------------------------ |
| Routing       | `app`          | `app/` — Next.js routes, thin        |
| Site chrome   | `widgets`      | `header/`, `footer/`                 |
| Page content  | `pages`        | `main/<page>/sections/<section>/`    |
| Cross-cutting | `shared`       | `shared/{ui,hooks,lib,config,types}` |

Inside a section the pattern is **Component Colocation**: a section owns its
components, its copy, its types, its hooks and its Server Action. Nothing that
belongs to one section lives anywhere else.

Dependencies point **downward only**:

```
app/  →  header/ · main/ · footer/  →  shared/  →  @project/common-ui
```

`main/` never imports from `header/` or `footer/`. Sections never import from
other sections. `shared/` never imports from any of them.

---

## 2. Directory layout

```
apps/user-web/
├── public/             # static assets, mirrors main/: images/home/, images/news/, …
├── src/
│   ├── app/            # ROUTES ONLY — the route manifest, nothing else
│   ├── header/         # everything rendered inside <header>
│   ├── main/           # everything rendered inside <main>, by page
│   ├── footer/         # everything rendered inside <footer>
│   └── shared/         # reused by 2+ of the above — a folder appears when needed
│       ├── ui/         #   reusable components (Section, SectionHeading, PageIntro)
│       ├── config/     #   site-wide constants (contacts, socials)
│       ├── styles/     #   globals.css — palette tokens and base CSS
│       ├── fonts/      #   self-hosted font files
│       ├── hooks/      #   reusable hooks            (not created yet)
│       ├── lib/        #   pure helpers              (not created yet)
│       └── types/      #   types crossing slices     (not created yet)
└── …                   # package.json, tsconfig.json, next.config.js, eslint.config.js
```

All source lives under `src/`, so the app root holds only `public/`, `src/` and
config files. Next.js resolves `src/app` natively (`findDir` checks `./app`
first, then `./src/app`); since there is no root `app/`, `src/app` is the
router.

`@/` maps to `src/` (`"@/*": ["./src/*"]` in `tsconfig.json`), so imports read as
the structure does:

```ts
import { SiteHeader } from '@/header';
import { HomePage } from '@/main/home';
import { Section, PageIntro } from '@/shared/ui';
```

Five source folders at the root, each answering a different question. No folder
named `components/` exists at any level — that name carries no information and
is what caused the current scatter.

---

## 3. `app/` — the routing layer

`app/` contains Next.js special files and nothing else. A `page.tsx` wires a URL
to a page component and, where needed, unwraps `searchParams`. That is its whole
job.

**The folder nesting here is not ours to choose.** In the App Router the folder
path _is_ the URL: `app/news/page.tsx` is the declaration of `/news`, not a file
that happens to sit in a folder. Route files cannot be relocated, and `app/`
should be read as the site map rather than as source code. Everything that is
merely _used_ by a route — including `globals.css` and the font files — belongs
in a slice, so that `app/` lists URLs and nothing else.

**Never create a folder named `pages/`.** Next.js 16 still scans `./pages` and
`./src/pages` (`findPagesDir`) and will enable the Pages Router from it — and we
use `src/`, so `src/pages/` is exactly the path it looks at. The job a `pages/`
folder would do is already done by `main/`.

```
app/
├── layout.tsx              # <html>, fonts, metadata, header/footer shell
├── favicon.ico             # Next.js resolves this by convention — it must live here
├── page.tsx                # "/"            → <HomePage />
├── news/page.tsx           # "/news"        → <NewsPage />
├── activities/page.tsx     # "/activities"  → <ActivitiesPage />
├── about/page.tsx
├── partners/page.tsx
└── support/page.tsx
```

```tsx
// app/news/page.tsx — this is the whole file
import { NewsPage } from '@/main/news';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Route({ searchParams }: Props) {
  return <NewsPage searchParams={await searchParams} />;
}
```

A `page.tsx` is **15 lines or fewer**. If it grows, the logic belongs in the
page component under `main/`. Route files hold no markup, no data, no classes.

---

## 4. `header/` and `footer/`

Flat folders. Open `header/`, see every file the header uses — and nothing else.

```
header/
├── SiteHeader.tsx              # the slice root — the only thing layout.tsx imports
├── PrimaryNavigation.tsx       'use client'
├── HeaderActions.tsx           'use client'
├── MobileNavigationMenu.tsx    'use client'
├── navigation.ts               # the header's own links and languages
└── index.ts                    # export { SiteHeader }

footer/
├── SiteFooter.tsx
├── FooterLinkColumn.tsx
├── FooterContacts.tsx
├── FooterSocials.tsx
├── navigation.ts               # the footer's own link columns
└── index.ts
```

Each slice keeps the navigation data it alone renders. Values used by **both**
(contact details, social profiles, the canonical route list) go to
`shared/config/` — one source of truth, so header and footer cannot drift.

These two folders cover the `<header>` and `<footer>` elements only. A
layout-level widget that lives in neither — `ScrollToTopButton` — is a shared
component rendered by `app/layout.tsx`; it goes to `shared/ui/`.

---

## 5. `main/` — pages and their sections

`main/` is split by page first, because `<main>` is the part of the layout that
changes per route. Then by section.

```
main/
├── home/
│   ├── HomePage.tsx        # composes the sections, in visual order
│   ├── sections/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── values/
│   │   └── …
│   └── index.ts
├── news/
├── activities/
├── about/
├── partners/
└── support/
```

A page component is a **Container**: it derives data and composes sections. It
holds no section markup of its own.

```tsx
// main/home/HomePage.tsx
export function HomePage() {
  return (
    <div className="flex flex-col gap-14 lg:gap-16">
      <HeroSection />
      <ValuesHighlightsSection />
      <AboutSection />…
    </div>
  );
}
```

Reading this file top to bottom tells you the page's order. That list is the
index into `sections/`.

A page with a single section (`about`, `partners`, `support` today) may keep its
markup in `<Page>.tsx` and skip `sections/` until a second section appears.

---

## 6. Section folder anatomy — the core rule

**Every section folder has the same shape.** This is what makes the structure
learnable in one sitting: open any section, anywhere in the app, and the
filenames mean the same thing.

```
main/home/sections/hero/
├── HeroSection.tsx      # REQUIRED — the section root, named <Folder>Section.tsx
├── HeroTitle.tsx        # child components, flat, one component per file
├── HeroSubtitle.tsx
├── HeroActions.tsx
├── DesktopHero.tsx
├── MobileHero.tsx
├── content.ts           # the copy and data this section renders
├── types.ts             # types shared by the files above
├── lib.ts               # pure helpers (or a named file: newsQuery.ts)
├── useHeroSlider.ts     # hooks used ONLY by this section
├── actions.ts           # 'use server' — Server Actions this section submits to
└── index.ts             # export { HeroSection } — the section's only public export
```

Rules:

- **`<Folder>Section.tsx` always exists** and is always what `index.ts` exports.
  It is the single entry point; the page never reaches past it.
- **Only `<Folder>Section.tsx` is exported.** Child components are private to the
  folder. If another section needs one, it moves to `shared/ui/` — it is never
  imported across sections.
- **Flat inside.** No subfolders in a section. A section that wants subfolders
  is two sections.
- **`content.ts` holds the data the section renders** — every list, and any
  string used more than once. That is the part destined for a CMS or database,
  so isolating it turns that migration into a one-file change per section, and
  it is why the file is named the same in every section.
  A section's own title, rendered once in JSX, may stay in the markup: moving a
  single-use string out costs a file hop and buys nothing.
  What stays in the component is **behaviour and looks** — animation tiers, drag
  thresholds, form sentinels, class-name constants. `content.ts` is what the
  section says, not how it works.
- **A section-local hook stays in the section.** Moving it to `shared/hooks/`
  would recreate the exact search problem this structure exists to remove.
  Promote it only when a second section uses it.
- **`actions.ts` lives beside the form that submits to it.** Server Actions are
  still untrusted entry points — `.claude/rules/security.md` applies in full.

Only `<Folder>Section.tsx` and `index.ts` are required; create the rest when
they have content.

---

## 7. `shared/` — the promotion target

```
shared/
├── ui/          Section · SectionHeading · PageIntro · ScrollToTopButton
├── hooks/       hooks used by 2+ slices
├── lib/         pure helpers used by 2+ slices (formatting, url building)
├── config/      site.ts · contacts.ts · routes.ts — site-wide constants
└── types/       types crossing slice boundaries
```

Something enters `shared/` **only when a second consumer appears** — never in
anticipation. Promotion is a move plus an import update, which is cheap;
a `shared/` full of single-use files is the scatter we are removing.

`shared/ui/` is for Svitanky-styled building blocks. Generic, brand-agnostic
primitives (button, input, dialog) belong in `packages/common-ui` and are
imported as `@project/common-ui`.

The two primitives every section uses:

- `<Section>` — the page-width shell: ground colour, responsive horizontal
  padding, anchor `id`, `aria-label`.
- `<SectionHeading>` — the uppercase navy `h2` plus optional lede paragraph.

---

## 8. Where does a new file go?

Answer in order; take the first "yes".

1. **A Next.js route file?** → `app/`.
2. **Rendered inside `<header>` / `<footer>`?** → `header/` / `footer/`.
3. **Generic, brand-agnostic primitive?** → `packages/common-ui`.
4. **Used by 2+ slices already?** → `shared/{ui,hooks,lib,config,types}`.
5. **Otherwise** → the section that renders it:
   `main/<page>/sections/<section>/`.

Default to 5. Everything starts owned by one section and is promoted only when
reality forces it.

---

## 9. Server vs. Client Components

Default to Server Components. Add `'use client'` only for state, effects, event
handlers or browser APIs — and push it as far down the tree as it goes.

The pattern: a Server section renders a small Client leaf.

```
GallerySection.tsx      → Server: layout, static markup, images
GalleryArrowButton.tsx  → 'use client': the one thing that needs onClick
```

`<Folder>Section.tsx` needing `'use client'` is a signal to extract the
interactive part into a child instead.

---

## 10. Naming

| Thing          | Convention                                     | Example                       |
| -------------- | ---------------------------------------------- | ----------------------------- |
| Slice folder   | lowercase                                      | `header/`, `main/`, `shared/` |
| Page folder    | `kebab-case`, matches the URL segment          | `main/activities/`            |
| Page component | `<Page>Page.tsx`                               | `NewsPage.tsx`                |
| Section folder | `kebab-case`, no `-section` suffix             | `sections/raising-funds/`     |
| Section root   | `<Folder>Section.tsx` in PascalCase            | `RaisingFundsSection.tsx`     |
| Component file | `PascalCase.tsx`, one component per file       | `NewsCard.tsx`                |
| Section data   | always `content.ts`, exports `SCREAMING_SNAKE` | `content.ts` → `VALUES`       |
| Section types  | always `types.ts`                              |                               |
| Hook file      | `useThing.ts`                                  | `useNewsFilters.ts`           |
| Section anchor | `id` = the section folder name                 | `id="raising-funds"`          |

The folder and the file inside must not repeat the same word:
`hero/HeroSection.tsx` ✅, `hero-section/HeroSection.tsx` ❌.

Exports are **named**, never default — except `page.tsx`, `layout.tsx`,
`error.tsx`, `not-found.tsx`, which Next.js requires to be default.

---

## 11. Barrels and imports

- One `index.ts` per **slice root** (`header/`, `footer/`, `main/<page>/`) and
  per **section folder**. Nowhere else.
- A barrel exports the slice's public surface only — a section barrel exports
  exactly one thing, its `<Folder>Section`.
- Inside a folder, siblings import each other by **relative path**. The barrel
  is the outward face, not an internal hub.
- Across folders, always import through the barrel by alias:
  `@/main/home`, `@/shared/ui`. Never reach into another folder's internals.
- No barrels in `shared/config/` or `shared/types/` — import those directly so
  the dependency stays visible.

---

## 12. Styling

- Tailwind utilities inline. No CSS modules.
- **A colour used more than once must be a token, never a hex.** The page ground
  is `bg-canvas`, the brand navy is `text-brand-navy`; the palette lives in
  `app/globals.css` under `@theme inline`. Add the token the moment a colour
  gets its second usage — the first usage may stay an arbitrary value.
  A handful of one-off decorative shades are still inline for exactly that
  reason; promote one the moment you reach for it again.
- Repeated layout belongs in `<Section>` / `<SectionHeading>`, not in a copied
  class string.
- `globals.css` is only for what Tailwind cannot express: font variables,
  `--site-header-height`, keyframes, `scroll-margin-top`.

---

## 13. Data flow

```
content.ts  →  <Page>.tsx (Server Container)  →  props  →  <Folder>Section.tsx
                     ↑                                            │
                  lib.ts (pure)                     form action   ↓
                                                             actions.ts
```

- Search params are the source of truth for filtering and pagination, and are
  **untrusted** — parse and clamp them in the section's `lib.ts` before use.
  `parseNewsFilter` is the reference implementation.
- Mutations go through Server Actions, driven by `useActionState`. Re-validate
  every input server-side.
- No `useEffect` fetching. No client data-fetching libraries for initial load.

---

## 14. Size limits

- Component file: **150 lines**. At 150, extract a child.
- `app/**/page.tsx`: **15 lines**.
- `<Page>.tsx`: **60 lines**. It composes; it does not implement.
- Props per component: **7**.
- Files in one section folder: **~10**. Beyond that, it is two sections.

---

## 15. Checklist for a new section

Adding a "Partners" section to the home page:

1. `main/home/sections/partners/PartnersSection.tsx` — Server by default,
   wrapped in `<Section>`, titled by `<SectionHeading>`.
2. `main/home/sections/partners/content.ts` — every string and list it renders.
3. `main/home/sections/partners/types.ts` — if more than one file needs the type.
4. Child components flat beside it, one per file.
5. `main/home/sections/partners/index.ts` — `export { PartnersSection }`.
6. Add it to `HomePage.tsx` in its visual position.
7. Images under `public/assets/images/home/partners/`.

## Checklist for a new page

Adding `/camps`:

1. `main/camps/CampsPage.tsx` + `main/camps/index.ts`.
2. `main/camps/sections/<section>/…` per the checklist above.
3. `app/camps/page.tsx` — the 15-line route file.
4. Add the route to `shared/config/routes.ts`, and to `header/navigation.ts`
   or `footer/navigation.ts` if it belongs in the chrome.
5. Images under `public/assets/images/camps/`.

---

## 16. Forbidden

- A folder named `components/` anywhere.
- Anything in `app/` other than Next.js special files — no stylesheets, no
  assets, no helpers.
- A folder named `pages/` in the app root or in `src/`.
- A section importing from another section, or reaching past a barrel into
  another folder's internals.
- `header/` or `footer/` importing from `main/`, or `shared/` importing from
  any slice.
- Copy or data hardcoded in the component that renders it, instead of `content.ts`.
- A single-use component or hook placed in `shared/`.
- Subfolders inside a section folder.
- A hex colour used twice without a token, or a copy-pasted section-shell class
  string, in a component.
- A folder whose name repeats the name of the file inside it.
- Default exports outside Next.js special files.

---

## 17. Scope, and when to outgrow this

**LSA fits `user-web` because it is a content site**: fixed chrome, pages that
are ordered stacks of sections, and no real domain model. The dominant question
a developer asks here is "I see this on screen — where is it?", and the layout
axis answers it fastest.

**Do not apply it to `apps/admin-web`.** That app is CRUD over domain entities;
its dominant question is "what can a camp do?", so it wants a feature/domain
split. Two apps, two structures, on purpose.

**Outgrow LSA when `main/` starts holding domain logic** — donations, auth,
user accounts, anything with real entities and rules shared across pages. The
signal is `shared/lib/` filling with business logic rather than helpers. At that
point promote to full FSD by adding `entities/` and `features/` layers between
`main/` and `shared/`; the slices above them do not have to move.

---

## Appendix A — Target tree

```
apps/user-web/src/
│
├── app/
│   ├── layout.tsx                    <SiteHeader/> · {children} · <SiteFooter/> · <ScrollToTopButton/>
│   ├── favicon.ico
│   ├── page.tsx                      → <HomePage/>
│   ├── news/page.tsx                 → <NewsPage searchParams/>
│   ├── activities/page.tsx           → <ActivitiesPage/>
│   ├── about/page.tsx                → <AboutPage/>
│   ├── partners/page.tsx             → <PartnersPage/>
│   └── support/page.tsx              → <SupportPage/>
│
├── header/
│   ├── SiteHeader.tsx
│   ├── PrimaryNavigation.tsx         'use client'
│   ├── HeaderActions.tsx             'use client'
│   ├── MobileNavigationMenu.tsx      'use client'
│   ├── navigation.ts
│   └── index.ts
│
├── main/
│   ├── home/
│   │   ├── HomePage.tsx
│   │   ├── sections/
│   │   │   ├── hero/                 HeroSection · DesktopHero · MobileHero
│   │   │   │                         HeroTitle · HeroSubtitle · HeroActions · content.ts
│   │   │   ├── values-highlights/    ValuesHighlightsSection · IconTextItem · content.ts
│   │   │   ├── about/                AboutSection · AboutImageSlider 'use client' · content.ts
│   │   │   ├── values/               ValuesSection · ValueCard · content.ts
│   │   │   ├── location/             LocationSection · content.ts
│   │   │   ├── activities/           ActivitiesSection · ActivityCard · content.ts
│   │   │   ├── gallery/              GallerySection 'use client' · GalleryArrowButton · content.ts
│   │   │   ├── raising-funds/        RaisingFundsSection · RaisingFundsCard · content.ts
│   │   │   ├── community-life/       CommunityLifeSection · CommunityLifeRow · content.ts
│   │   │   ├── video/                VideoSection · YouTubePlayer 'use client' · content.ts
│   │   │   ├── join-community/       JoinCommunitySection · SupportForm 'use client'
│   │   │   │                         actions.ts · content.ts
│   │   │   └── team/                 TeamSection · TeamMemberCard · content.ts
│   │   └── index.ts
│   │
│   ├── news/
│   │   ├── NewsPage.tsx
│   │   ├── sections/news-feed/       NewsFeedSection · NewsFilterTabs · NewsGrid
│   │   │                             NewsCard · NewsPagination
│   │   │                             content.ts · types.ts · newsQuery.ts · index.ts
│   │   └── index.ts
│   │
│   ├── activities/
│   │   ├── ActivitiesPage.tsx
│   │   ├── sections/directions/      ActivityDirectionsSection · ActivityDirectionCard
│   │   │                             DirectionIcon · content.ts · types.ts · index.ts
│   │   └── index.ts
│   │
│   ├── about/       AboutPage.tsx · index.ts
│   ├── partners/    PartnersPage.tsx · index.ts
│   └── support/     SupportPage.tsx · index.ts
│
├── footer/
│   ├── SiteFooter.tsx
│   ├── FooterLinkColumn.tsx
│   ├── FooterContacts.tsx
│   ├── FooterSocials.tsx
│   ├── navigation.ts
│   └── index.ts
│
└── shared/
    ├── ui/       Section · SectionHeading · PageIntro · ScrollToTopButton 'use client' · index.ts
    ├── config/   contacts.ts
    ├── styles/   globals.css
    └── fonts/    GeistVF.woff · GeistMonoVF.woff

`shared/hooks/`, `shared/lib/` and `shared/types/` do not exist yet — create one
when a second slice actually needs it, per §7.
```

## Appendix B — Known deviations

The migration to this structure is complete (commits `refactor(user-web): …`).
What still does not meet the rules above, and is fair game to fix:

| Deviation              | Where                                               | Rule                                                                    |
| ---------------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| 214 lines              | `main/home/sections/join-community/SupportForm.tsx` | §14, 150-line limit — split the amount picker and the consent block out |
| 188 lines              | `main/home/sections/about/AboutImageSlider.tsx`     | §14 — the drag maths wants to be a `useImageSlider` hook in the section |
| 174 lines              | `header/MobileNavigationMenu.tsx`                   | §14 — the language switcher is a component of its own                   |
| 12 one-off hexes       | gradients and decorative fills across `main/`       | §12 — each has a single usage; tokenise on the second                   |
| No `Section` wrapper   | `main/home/sections/hero/*`                         | Deliberate: the hero is full-bleed and has no page gutter               |
| `id="values"` coupling | `shared/ui/ScrollToTopButton.tsx`                   | The button reveals itself from an anchor on the home page only          |
