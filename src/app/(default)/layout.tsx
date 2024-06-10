"use client";

import "@/app/styles";
import s from "@/pages/GeneralPage.module.scss";
import { useAuth } from "@/shared/helpers/auth";
import { CircularProgress, Stack } from "@mui/joy";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, isLoading, user, getUser } = useAuth();

  useEffect(() => {
    if (!isAuth || !user) {
      getUser();
    }
  }, [user]);

  return (
    <body>
      {/* Если */}
      {!isAuth && !user && isLoading && (
        <main className={s.main}>
          <Stack
            sx={{ height: "100vh", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
            bgcolor={"background.body"}
          >
            <CircularProgress size="lg" color="primary" />
          </Stack>
        </main>
      )}

      {!isAuth && !user && !isLoading && (
        <main className={s.main}>{children}</main>
      )}

      {isAuth && !isLoading && user && (
        <main className={s.main}>{children}</main>
      )}
    </body>
  );
}
