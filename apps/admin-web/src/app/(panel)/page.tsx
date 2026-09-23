import { requireAdmin } from '@/features/auth/session';
import { DashboardOverview } from '@/features/dashboard';

export default async function Route() {
  // Layouts do not re-run on client navigation — each page checks for itself.
  const admin = await requireAdmin();
  return <DashboardOverview email={admin.email} />;
}
