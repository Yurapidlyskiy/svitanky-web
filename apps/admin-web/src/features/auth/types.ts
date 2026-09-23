export type Admin = {
  id: string;
  email: string;
};

export type LoginFormState = {
  /** Form-level error, shown above the fields. */
  error?: string;
  fieldErrors?: Partial<Record<'email' | 'password', string[]>>;
  /** Echoed back so a failed attempt does not wipe the email. Never the password. */
  email?: string;
};
