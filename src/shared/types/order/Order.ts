export type OrderType = "new" | "confirmed" | "rejected";

export interface Order {
  id: string;
  firstname: string;
  lastname: string;
  thirdname: string;
  phone: string;
  date: string;
  time: string;
  car: string;
  description_problem: string;
  status: OrderType;
  created_at: string;
}

export type CreateOrder = Omit<Order, "id">;
