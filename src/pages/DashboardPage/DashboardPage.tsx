"use client";

import { language, translate } from "@/data/admin/translate";
import s from "../GeneralPage.module.scss";

const DashboardPage = () => {
  return (
    <div className={s.page}>
      <h2 className={s.title}>{translate.main.title[language]}</h2>
    </div>
  );
};

export default DashboardPage;
