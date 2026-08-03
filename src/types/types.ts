// This file only contains TypeScript "shapes" (interfaces) — no actual logic.
// Defining these up front means every component that touches order data
// gets autocomplete + error-checking instead of guessing field names.

import type { Clerk } from "@/data/clerks";

export type OrderStatus =
  | "cancelled"
  | "order placed"
  | "payment completed"
  | "assigned"
  | "applied"
  | "dispatched"
  | "delivered";

export interface Tag {
  id: string;
  label: string;
  color: string;
}

/* ---------------- Customer ---------------- */

export interface CaseCustomerDetails {
  caseNumber: string;
  legalName: string;
  name: string;
  email: string;
  phone: string;
  deliveryFeedback?: string;
  issue?: string;
}

/* ---------------- Address ---------------- */

export interface AddressDetails {
  pincode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
}

/* ---------------- Product ---------------- */

export interface ProductDetail {
  type: string;
  orderDate: string;
  file?: string;
}

/* ---------------- Digio ---------------- */

export interface DigioDocument {
  digioId: string;
  status: string;
  signedDocumentUrl?: string;
  auditLogUrl?: string;
}

/* ---------------- View Modal ---------------- */

export interface OrderViewDetails {
  orderId: string;
  trackingId: string;
  paymentCompleted: string;
  orderPlaced: string;
  assigned: string;
  applied: string;
  dispatched: string;
  delivered: string;
  caseCustomer: CaseCustomerDetails;
  address: AddressDetails;
  product: ProductDetail;
  digio: DigioDocument;
}

/* ---------------- Order ---------------- */

export interface Order {
  id: number;

  userName: string;
  phone: string;
  orderRef: string;

  courtComplex: string;
  city: string;

  productName: string;
  amount: number;

  orderDate: string;
  orderTime: string;

  status: OrderStatus;
  statusNote?: string;

  tags: Tag[];

  assignedDate?: string;

  clerk?: Clerk | null;

  caseNumber?: string;
  caseName?: string;
  cnrNumber?: string;

  viewDetails?: OrderViewDetails;
}