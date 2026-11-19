import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SERVICE_KEY_OPTIONS } from "@/lib/adminLabels";
import { cn } from "@/lib/utils";

const HEADERS = ["Thứ tự", "Tên gói", "Dịch vụ", "Giá", "Nổi bật", "Hiển thị", "Hành động"];

export default function PackageTable({
  items,
  loading,
  onDragEnd,
  onEdit,
  onToggle,
  onDelete,
}) {
  if (loading) {
    return <p className="px-4 py-10 text-center font-body text-sm text-ink-soft/55">Đang tải gói dịch vụ…</p>;
  }

  if (!items.length) {
    return (
      <p className="px-4 py-10 text-center font-body text-sm text-ink-soft/55">
        Chưa có gói dịch vụ nào. Bấm “Thêm gói” để tạo gói đầu tiên.
      </p>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-cream/60">
              {HEADERS.map((title) => (
                <th
                  key={title}
                  className="whitespace-nowrap px-3 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft/55"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <Droppable droppableId="packages">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(dragProvided) => (
                      <tr
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        className={cn(
                          "border-b border-line/70 last:border-0",
                          !item.is_active && "bg-cream/40"
                        )}
                      >
                        <td className="px-3 py-3">
                          <span
                            {...dragProvided.dragHandleProps}
                            className="inline-flex cursor-grab items-center gap-1 font-body text-xs text-ink-soft/50"
                          >
                            <GripVertical className="h-4 w-4" />
                            {item.sort_order ?? index + 1}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <p className="font-body text-sm font-medium text-ink">{item.name}</p>
                          {item.price_note && (
                            <p className="font-body text-[11px] text-ink-soft/55">{item.price_note}</p>
                          )}
                        </td>
                        <td className="px-3 py-3 font-body text-xs text-ink-soft/70">
                          {SERVICE_KEY_OPTIONS.find((option) => option.value === item.service_key)?.label ??
                            item.service_key}
                        </td>
                        <td className="px-3 py-3 font-body text-sm text-ink">{item.price_label}</td>
                        <td className="px-3 py-3">
                          <Switch
                            checked={!!item.highlight}
                            onCheckedChange={() => onToggle(item, "highlight")}
                            aria-label="Đổi nhãn nổi bật"
                          />
                        </td>
                        <td className="px-3 py-3">
                          <Switch
                            checked={!!item.is_active}
                            onCheckedChange={() => onToggle(item, "is_active")}
                            aria-label="Ẩn hoặc hiện gói"
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              aria-label="Sửa gói"
                              onClick={() => onEdit(item)}
                              className="rounded-lg p-1.5 text-ink-soft/60 transition-colors hover:bg-cream hover:text-gold-dark"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              aria-label="Xóa gói"
                              onClick={() => onDelete(item)}
                              className="rounded-lg p-1.5 text-ink-soft/60 transition-colors hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </div>
    </DragDropContext>
  );
}