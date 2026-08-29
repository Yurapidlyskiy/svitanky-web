import { inputClassName, labelClassName } from './styles';

export function ContactFields() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label className={labelClassName} htmlFor="firstName">
          Введіть ім&apos;я *
        </label>
        <input
          autoComplete="given-name"
          className={inputClassName}
          id="firstName"
          name="firstName"
          placeholder="Введіть ім'я"
          required
          type="text"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName} htmlFor="lastName">
          Введіть прізвище *
        </label>
        <input
          autoComplete="family-name"
          className={inputClassName}
          id="lastName"
          name="lastName"
          placeholder="Введіть прізвище"
          required
          type="text"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName} htmlFor="phone">
          Номер телефону: *
        </label>
        <input
          autoComplete="tel"
          className={inputClassName}
          id="phone"
          name="phone"
          placeholder="+38 (0"
          required
          type="tel"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName} htmlFor="email">
          Email: *
        </label>
        <input
          autoComplete="email"
          className={inputClassName}
          id="email"
          name="email"
          placeholder="Введіть свій @email"
          required
          type="email"
        />
      </div>
    </div>
  );
}
