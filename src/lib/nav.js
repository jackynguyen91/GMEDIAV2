export const MAIN_NAV = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  {
    label: "Dịch vụ",
    to: "/dich-vu",
    children: [
      { label: "Thiết kế Website & WebApp", to: "/dich-vu/thiet-ke-website" },
      { label: "Dịch vụ Google Ads", to: "/dich-vu/google-ads" },
      { label: "Dịch vụ Facebook Ads", to: "/dich-vu/facebook-ads" },
      { label: "Dịch vụ Content Website", to: "/dich-vu/content" },
      { label: "Digital Marketing", to: "/dich-vu/digital-marketing" },
      { label: "Chứng chỉ SSL", to: "/dich-vu/chung-chi-ssl" },
    ],
  },
  { label: "Tên miền & Hosting", to: "/dich-vu/ten-mien-hosting" },
  { label: "Giải pháp", to: "/giai-phap" },
  { label: "Dự án", to: "/du-an" },
  { label: "Blog", to: "/blog" },
  { label: "Liên hệ", to: "/lien-he" },
];

export const FOOTER_ABOUT_LINKS = [
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Dự án", to: "/du-an" },
  { label: "Tuyển dụng", to: "/tuyen-dung" },
  { label: "Liên hệ", to: "/lien-he" },
  { label: "Chính sách bảo mật", to: "/chinh-sach-bao-mat" },
];

export const FOOTER_SERVICE_LINKS = [
  { label: "Thiết kế Website & WebApp", to: "/dich-vu/thiet-ke-website" },
  { label: "Dịch vụ Facebook Ads", to: "/dich-vu/facebook-ads" },
  { label: "Dịch vụ Google Ads", to: "/dich-vu/google-ads" },
  { label: "Content Marketing", to: "/dich-vu/content" },
];

export function isNavActive(pathname, to) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}