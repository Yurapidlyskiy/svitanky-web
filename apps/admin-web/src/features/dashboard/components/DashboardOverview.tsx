type Props = {
  email: string;
};

export function DashboardOverview({ email }: Props) {
  return (
    <section className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold text-brand-navy">Вітаємо в панелі керування</h1>
      <p className="mt-2 text-brand-slate">
        Ви увійшли як <span className="font-medium text-brand-navy">{email}</span>.
      </p>
    </section>
  );
}
