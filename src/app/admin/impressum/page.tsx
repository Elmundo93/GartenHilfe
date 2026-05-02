import { getImpressumContent } from "@/lib/content";
import { AdminShell } from "@/components/admin/AdminShell";
import { ImpressumForm } from "@/components/admin/ImpressumForm";

export default async function AdminImpressumPage() {
  const content = await getImpressumContent();
  return (
    <AdminShell title="Impressum bearbeiten">
      <ImpressumForm initial={content} />
    </AdminShell>
  );
}
