import { notFound } from "next/navigation";
import { getService, type Service } from "@/lib/content";
import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceForm } from "@/components/admin/ServiceForm";
import type { ServiceEditData } from "@/lib/admin-actions";

export default async function AdminServiceEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug as Service["slug"]);
  if (!service) return notFound();

  const initial: ServiceEditData = {
    title: service.title,
    intro: service.intro,
    content: service.content ?? "",
    note: service.note ?? "",
    benefits: service.benefits ?? [],
    categories: service.categories ?? [],
    steps: service.steps ?? [],
    faqs: service.faqs ?? [],
    heroImage: service.heroImage ?? "",
  };

  return (
    <AdminShell title={service.title} backHref="/admin/leistungen">
      <ServiceForm slug={service.slug} initial={initial} />
    </AdminShell>
  );
}
