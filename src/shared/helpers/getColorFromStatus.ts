import type { ColorPaletteProp } from "@mui/joy";
import { OrderType } from "../types/order/Order";

export const getColorFromStatus = (status: OrderType): ColorPaletteProp => {
  switch (status) {
    case "new":
      return "warning";
    case "confirmed":
      return "success";
    default:
      return "danger";
  }
};
