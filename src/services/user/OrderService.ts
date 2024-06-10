import type { Order, OrderType } from "@/shared/types/order/Order";

// Сервис управления заявками
export class OrderService {
  static saveOrder(order: Order) {
    const orders = localStorage.getItem("orders");

    if (!orders) {
      const newOrders = [order];
      localStorage.setItem("orders", JSON.stringify(newOrders));
      return order;
    }

    const ordersArr = JSON.parse(orders) as Order[];
    ordersArr.push(order);
    localStorage.setItem("orders", JSON.stringify(ordersArr));
    return order;
  }

  static getOrders() {
    const orders = localStorage.getItem("orders");
    return orders ? (JSON.parse(orders) as Order[]) : null;
  }

  static getOrder(id: string) {
    const orders = localStorage.getItem("orders");
    if (!orders) return null;

    const ordersArr = JSON.parse(orders) as Order[];
    return ordersArr.find((order) => order.id === id);
  }

  static changeOrderStatus(id: string, status: OrderType) {
    const orders = localStorage.getItem("orders");
    if (!orders) return null;

    const ordersArr = JSON.parse(orders) as Order[];
    const index = ordersArr.findIndex((order) => order.id === id);
    if (index === -1) return null;

    ordersArr[index].status = status;
    localStorage.setItem("orders", JSON.stringify(ordersArr));
    return ordersArr[index];
  }
}
