import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ten-mien-hosting")({
  beforeLoad: () => {
    throw redirect({ to: "/dich-vu/ten-mien-hosting" });
  },
});