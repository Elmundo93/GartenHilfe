import { getKontaktInfo } from "@/lib/content";
import { AdminShell } from "@/components/admin/AdminShell";
import { KontaktForm } from "@/components/admin/KontaktForm";

export default async function AdminKontaktPage() {
  const info = await getKontaktInfo();
  return (
    <AdminShell title="Kontaktdaten & vCard">
      <KontaktForm initial={info} />
    </AdminShell>
  );
}
