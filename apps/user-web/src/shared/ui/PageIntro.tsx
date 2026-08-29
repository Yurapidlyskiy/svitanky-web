type PageIntroProps = {
  description: string;
  title: string;
};

export function PageIntro({ description, title }: PageIntroProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
      <p className="text-sm font-bold tracking-[0.16em] text-amber-600 uppercase">
        Світанки України
      </p>
      <h1 className="mt-4 font-heading text-4xl font-black text-sky-950 sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
    </section>
  );
}
