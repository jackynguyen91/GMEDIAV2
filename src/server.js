// Worker entry (đã chỉnh để chạy trên Cloudflare riêng, không còn trên nền tảng Base44).
// Trình duyệt vẫn gọi đường dẫn cùng origin /api/apps/... như khi chạy trên Base44 (đăng nhập, MFA,
// đọc/ghi entity, upload...). Worker chuyển tiếp các request đó sang máy chủ Base44.
import { env } from "cloudflare:workers";
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { recordRouteError } from "@/lib/error-capture.server";

const PROXY_PREFIXES = ["/api/apps/", "/api/app-logs/"];

const startHandler = createStartHandler((ctx) => {
  for (const match of ctx.router.state.matches) {
    if (match.status === "error") recordRouteError(ctx.request, match.error, match.routeId);
  }
  return defaultStreamHandler(ctx);
});

function proxyToBase44(request, url) {
  const base = env.BASE44_SERVER_URL || "https://base44.app";
  const target = new URL(url.pathname + url.search, base);
  // redirect: "manual" để các bước chuyển hướng OAuth (Google...) đi thẳng về trình duyệt.
  return fetch(new Request(target, request), { redirect: "manual" });
}

// Đổi chuỗi này mỗi lần vá để kiểm tra bản nào đang chạy: mở /__version trên website.
const BUILD_MARK = "gmedia-v3-no-service-role";

export default {
  fetch(request, ...rest) {
    const url = new URL(request.url);
    if (url.pathname === "/__version") {
      return new Response(BUILD_MARK, { headers: { "content-type": "text/plain", "cache-control": "no-store" } });
    }
    if (PROXY_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
      return proxyToBase44(request, url);
    }
    return startHandler(request, ...rest);
  },
};
