import { type ReactNode } from "react";
import { FaRegUser } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";

export interface Page {
  name: string;
  link: string;
  icon: ReactNode;
  pages?: Page[];
  isUnavailable?: boolean;
  isAdminPage?: boolean;
}

export interface GroupPages {
  groupName?: string;
  pages: Page[];
  isAdminPage?: boolean;
}

export const pages: GroupPages[] = [
  {
    pages: [
      {
        name: "Главная",
        link: "/",
        icon: <LuLayoutDashboard />,
      },
      {
        name: "Заявки",
        link: "/orders",
        icon: <MdOutlineWorkOutline />,
      },
      {
        name: "Все заявки",
        link: "/admin/dashboard",
        icon: <FaRegUser />,
        isAdminPage: true,
      },
    ],
  },
];
