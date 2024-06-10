import "@/app/styles";
import s from "@/pages/GeneralPage.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <main className={s.main}>{children}</main>
    </body>
  );
}
