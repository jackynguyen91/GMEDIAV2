import { LEAD_COLUMNS } from "@/lib/leadCsv";

// Xuất Excel dạng SpreadsheetML (định dạng bảng tính gốc của Excel, mở trực tiếp
// bằng Excel / LibreOffice / Google Sheets, không cần thư viện ngoài).
// Mọi ô đều là text để giữ nguyên số 0 đầu của số điện thoại.

const COLUMN_WIDTH = 140;
const TEXT_WIDTH = 260;

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cell(value) {
  return `<Cell ss:StyleID="body"><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`;
}

function headerCell(value) {
  return `<Cell ss:StyleID="header"><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`;
}

export function leadsToExcelXml(leads) {
  const header = LEAD_COLUMNS.map(([title]) => headerCell(title)).join("");
  const rows = leads
    .map(
      (lead) =>
        `<Row>${LEAD_COLUMNS.map(([, getter]) => cell(getter(lead))).join("")}</Row>`
    )
    .join("");

  const columns = LEAD_COLUMNS.map(
    ([title]) =>
      `<Column ss:AutoFitWidth="0" ss:Width="${
        /nội dung|trang gửi|ghi chú/i.test(title) ? TEXT_WIDTH : COLUMN_WIDTH
      }"/>`
  ).join("");

  const lastRow = leads.length + 1;
  const lastCol = LEAD_COLUMNS.length;

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Styles>
  <Style ss:ID="header">
   <Font ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#1A1A1A" ss:Pattern="Solid"/>
   <Alignment ss:Vertical="Center" ss:Horizontal="Left"/>
  </Style>
  <Style ss:ID="body">
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Lead">
  <Table>
   ${columns}
   <Row ss:StyleID="header">${header}</Row>
   ${rows}
  </Table>
  <AutoFilter x:Range="R1C1:R${lastRow}C${lastCol}" xmlns="urn:schemas-microsoft-com:office:excel"/>
 </Worksheet>
</Workbook>`;
}

export function downloadExcel(leads, filename) {
  const blob = new Blob([leadsToExcelXml(leads)], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}