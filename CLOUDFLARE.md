# Chạy GMedia trên Cloudflare Workers (dữ liệu vẫn ở Base44)

Kiến trúc: Cloudflare Worker render trang (SSR) + phục vụ file tĩnh; dữ liệu/đăng nhập vẫn nằm ở Base44.
- Trình duyệt gọi `/api/apps/...` cùng domain -> Worker chuyển tiếp sang https://base44.app (src/server.js)
- Server function (blog, dự án, gói dịch vụ, gửi lead) gọi Base44 bằng `src/lib/base44.server.js`

## 1. Chuẩn bị
- Node 20+ (khuyên 22), tài khoản Cloudflare (domain nên nằm trên Cloudflare DNS)
- `npm install`
- `npx wrangler login`

## 2. Cấu hình
1. `cp .env.example .env`  -> sửa VITE_BASE44_APP_BASE_URL thành domain của bạn
2. Không cần BASE44_SERVICE_TOKEN: Base44 không cấp service token cho app chạy ngoài Base44.
3. Cần chỉnh RLS trên Base44 (xem mục 5).

## 3. Chạy thử local
`npm run dev`  (server code chạy trong workerd như production)

## 4. Deploy
```
npm run deploy
```
Sau đó vào Cloudflare Dashboard > Workers & Pages > gmedia-web > Settings > Domains & Routes để gắn domain.

## 5. Quyền truy cập (RLS) phải chỉnh trên Base44
Server không còn quyền admin, nên entity phải cho phép:
- BlogPost: khách đọc được bài có is_published = true (admin vẫn đọc được tất cả)
- Project, ServicePackage, SiteSetting: đọc công khai (đã có)
- Lead: khách được tạo (create), chỉ admin được đọc/sửa/xoá

## 6. Lưu ý
- Gói Workers Free giới hạn kích thước script (3 MiB nén). Nếu deploy báo vượt giới hạn -> dùng Workers Paid.
- Đăng nhập Google/SSO và trang /auth/mfa do Base44 phục vụ: có thể cần thêm domain mới trong cài đặt auth của app.
- Realtime (/ws-user-apps) không được proxy; app hiện tại không dùng.
- Email báo lead (Core.SendEmail) vẫn đi qua Base44; nếu lỗi sẽ chỉ ghi log, lead vẫn được lưu.
