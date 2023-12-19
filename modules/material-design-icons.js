import { resolve } from "path";

const icons = [
  "Eye",
  "EyeOff",
  "FlagVariantOutline",
  "DotsHorizontal",
  "DotsVertical",
  "RadioboxMarked",
  "RadioboxBlank",
  "DragVertical",
  "Plus",
  "PencilOutline",
  "Link",
  "DeleteOutline",
  "Delete",
  "ContentCopy",
  "HeartOutline",
  "CloseCircleOutline",
  "ChevronDown",
  "ChevronLeft",
  "ChevronRight",
  "ChevronUp",
  "Drag",
  "ShareVariantOutline",
  "CheckboxMarkedCircleOutline",
  "MenuRight",
  "MenuDown",
  "FormatListGroup",
  "FolderOutline",
  "FolderOpenOutline",
  "InformationOutline",
  "AccountPlus",
  "Circle",
  "CalendarRangeOutline",
  "FileTree",
  "Text",
  "ForumOutline",
  "PlaylistRemove",
  "UnfoldMoreVertical",
  "CogOutline",
  "Check",
  "TagTextOutline",
  "ArchiveOutline",
  "WindowClose",
];

export default async function () {
  await this.nuxt.hook("components:dirs", (dirs) => {
    dirs.push({
      path: resolve("node_modules/vue-material-design-icons"),
      prefix: "mdi-",
      pattern: `**/@(${icons.join("|")}).vue`,
    });
  });
}
