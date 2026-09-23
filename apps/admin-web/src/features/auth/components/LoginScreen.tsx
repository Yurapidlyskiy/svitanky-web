import { LoginBrandPanel } from './LoginBrandPanel';
import { LoginForm } from './LoginForm';

type Props = {
  /** Already sanitised by `safeRedirectPath`. */
  next: string;
};

export function LoginScreen({ next }: Props) {
  return (
    <main className="grid flex-1 bg-canvas lg:grid-cols-2">
      <LoginBrandPanel />

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-border border-t-4 border-t-brand-amber bg-white p-6 shadow-lg shadow-brand-navy/10 sm:p-8">
            <h1 className="text-2xl font-semibold tracking-tight text-brand-navy">
              Вхід до панелі
            </h1>
            <p className="mt-1.5 text-sm text-brand-slate">
              Увійдіть, щоб керувати контентом фонду.
            </p>

            <LoginForm next={next} />
          </div>

          <p className="mt-6 text-center text-xs text-brand-slate">
            Доступ лише для адміністраторів «Дому Світанків».
          </p>
        </div>
      </div>
    </main>
  );
}
