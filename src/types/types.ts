// This file only contains TypeScript "shapes" (interfaces) — no actual logic.
// Defining these up front means every component that touches order data
// gets autocomplete + error-checking instead of guessing field names.

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
  color: string; // hex code, e.g. "#8FAADC"
}

export interface CaseCustomerDetails {
  caseNumber: string;
  legalName: string;
  name: string;
  email: string;
  phone: string;
  deliveryFeedback?: string;
  issue?: string;
}

export interface AddressDetails {
  pincode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
}

export interface ProductDetail {
  type: string;
  orderDate: string;
  file?: string;
}

export interface DigioDocument {
  digioId: string;
  status: string;
  signedDocumentUrl?: string;
  auditLogUrl?: string;
}

// Full detail set shown in the View Order modal.
// Kept separate from the main Order fields since the table doesn't need
// all of this — only the modal does, once you click "View".
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

export interface Order {
  id: number;
  userName: string;
  phone: string;
  orderRef: string; // e.g. "OP/000251/2026"
  courtComplex: string;
  city: string;
  productName: string; // e.g. "Judgement #584854"
  amount: number;
  orderDate: string; // display string, e.g. "7 Feb 2026"
  orderTime: string; // display string, e.g. "12:57 PM"
  statusNote?: string; // e.g. "03 days since payment"
  status: OrderStatus;
  tags: Tag[];
  assignedDate?: string; // if unassigned, leave undefined -> show "Assign" button
  // Used by the Share popup — optional because not every screen needs them
  caseNumber?: string;
  caseName?: string;
  cnrNumber?: string;
  // Used by the View Order modal — optional for the same reason
  viewDetails?: OrderViewDetails;
}
