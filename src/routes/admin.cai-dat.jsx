import { createFileRoute } from "@tanstack/react-router";
import SettingsForm from "@/components/admin/SettingsForm";

export const Route = createFileRoute("/admin/cai-dat")({
  ssr: false,
  head: () => ({ meta: [{ title: "Cài đặt | Quản trị GMedia" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-heading text-2xl font-semibold text-ink">Cài đặt</h1>
        <p className="mt-1 font-body text-sm text-ink-soft/60">
          Thông tin liên hệ dùng chung trên toàn website.
        </p>
      </header>

      <SettingsForm />
    </div>
  );
}