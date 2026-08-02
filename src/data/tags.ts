import { Tag } from "@/types/types";

// Matches the tag list visible in the Figma "Choose Tag" panel.
export const dummyTags: Tag[] = [
  { id: "t1", label: "Subscription Pending", color: "#8FAADC" },
  { id: "t2", label: "Nakul", color: "#A8D5BA" },
  { id: "t3", label: "Follow up case for Details", color: "#E7B7A3" },
  { id: "t4", label: "Add Case", color: "#C9BFA5" },
  { id: "t5", label: "Aadhaar Verified", color: "#E5D28A" },
  { id: "t6", label: "Autopay Concern", color: "#C7B3DB" },
  { id: "t7", label: "Background Check for Case", color: "#8FAADC" },
  { id: "t8", label: "Call Back", color: "#E7B7A3" },
  { id: "t9", label: "Case Added", color: "#C4C4C4" },
  { id: "t10", label: "Gouri", color: "#A8D5BA" },
];

// Matches the color swatch options in the "Create New Tag" popup.
export const tagColorOptions = [
  "#5B8FB9",
  "#7FB07F",
  "#C97B63",
  "#A99A82",
  "#D4B94E",
  "#A98FC9",
  "#5B7FA6",
  "#D89A9A",
  "#9AA0A6",
  "#4C9A8C",
  "#5B2A86",
] as const;