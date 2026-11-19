// Chạy NGOÀI nền tảng Base44: nền tảng không còn gắn header (Base44-App-Id, service credential...)
// vào request nữa, nên ta tự dựng client từ biến môi trường của Worker.
//   BASE44_APP_ID         (vars, wrangler.jsonc)  : ID app Base44
//   BASE44_SERVER_URL     (vars, wrangler.jsonc)  : mặc định https://base44.app
//   (Không dùng asServiceRole: Base44 chỉ cấp service token cho backend function chạy trên Base44.)
import { createClient } from "@base44/sdk";
import { env } from "cloudflare:workers";

export function createServerClient(request) {
  const auth = request?.headers?.get("Authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined;
  return createClient({
    appId: env.BASE44_APP_ID,
    serverUrl: env.BASE44_SERVER_URL || "https://base44.app",
    token, // token của khách đang đăng nhập (nếu có) -> entity access rules vẫn áp dụng
  });
}
