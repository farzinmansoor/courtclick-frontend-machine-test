export interface Clerk {
  id: string;
  name: string;
  phone: string;
  clerkId: string;
}

export const dummyClerks: Clerk[] = [
  {
    id: "c1",
    name: "Shabarinath",
    phone: "+91 9876543210",
    clerkId: "CLK001",
  },
  {
    id: "c2",
    name: "Rahul Nair",
    phone: "+91 9123456780",
    clerkId: "CLK002",
  },
  {
    id: "c3",
    name: "Anand Kumar",
    phone: "+91 9988776655",
    clerkId: "CLK003",
  },
  {
    id: "c4",
    name: "Nikhil Das",
    phone: "+91 9567843210",
    clerkId: "CLK004",
  },
];