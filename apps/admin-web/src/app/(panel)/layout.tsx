import { SignOutButton } from '@/features/auth';
import { requireAdmin } from '@/features/auth/session';
import { AdminHeader } from '@/shared/ui/AdminHeader';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <>
      <AdminHeader email={admin.email} actions={<SignOutButton />} />
      <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
    </>
  );
}
