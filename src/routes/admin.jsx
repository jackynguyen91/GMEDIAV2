import { useEffect } from "react";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/admin/AdminShell";
import NoAccess from "@/components/admin/NoAccess";
import { useAuth } from "@/lib/AuthContext";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Quản trị | GMedia" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isLoadingAuth, isAuthenticated, navigateToLogin } = useAuth();

  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) navigateToLogin();
  }, [isLoadingAuth, isAuthenticated, navigateToLogin]);

  if (isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="font-body text-sm text-ink-soft/60">Đang kiểm tra quyền truy cập…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="font-body text-sm text-ink-soft/60">Đang chuyển tới trang đăng nhập…</p>
      </div>
    );
  }

  if (user?.role !== "admin") return <NoAccess />;

  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}