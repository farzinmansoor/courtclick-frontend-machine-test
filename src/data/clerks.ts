export interface Clerk {
  id: string;
  name: string;
  phone?: string;
  clerkId?: string;
}

// Matches the sample clerk list visible in the Figma "Assign Authorized Personnel" popup.
export const dummyClerks: Clerk[] = [
  { id: "c1", name: "Shaman" },
  { id: "c2", name: "Shaman" },
  { id: "c3", name: "Shaman" },
  { id: "c4", name: "Shabarinath" },
];
