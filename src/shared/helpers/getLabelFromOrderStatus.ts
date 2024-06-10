import { OrderType } from "../types/order/Order";

export const getLabelFromOrderStatus = (status: OrderType): string => {
  switch (status) {
    case "new":
      return "Новый";
    case "confirmed":
      return "Подтверждено";
    default:
      return "Отклонено";
  }
};
