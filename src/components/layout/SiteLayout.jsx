import { useRouterState } from "@tanstack/react-router";
import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import { BusinessJsonLd } from "@/components/seo/JsonLd";

export default function SiteLayout({ children }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // The admin area is a separate interface with its own shell.
  if (pathname.startsWith("/admin")) {
    return <div className="min-h-screen bg-cream">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <BusinessJsonLd />
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}