export function LoginBrandPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-brand-navy p-12 text-canvas lg:flex lg:flex-col lg:justify-between">
      <div
        aria-hidden
        className="absolute -right-24 -bottom-24 size-96 rounded-full bg-brand-amber/90"
      />
      <div
        aria-hidden
        className="absolute -right-8 bottom-40 size-40 rounded-full bg-brand-sky/40"
      />

      <p className="relative flex items-center gap-2 text-lg font-semibold">
        <span aria-hidden className="size-3 rounded-full bg-brand-amber" />
        Світанки України
      </p>

      <div className="relative max-w-sm">
        <p className="text-3xl leading-tight font-semibold">Адмін панель</p>
        <p className="mt-3 text-brand-sky">Новини, події та контент сайту — в одному місці</p>
      </div>
    </aside>
  );
}
