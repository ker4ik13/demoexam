"use client";

import helloImg from "@/data/user/images/5.jpg";
import { useAuth } from "@/shared/helpers/auth";
import { Button, ButtonGroup, Divider, Stack, Typography } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const { user, isAuth } = useAuth();

  if (!user && !isAuth) {
    return (
      <Stack minHeight="100vh" alignItems="center" justifyContent="center">
        <title>Войдите в аккаунт</title>
        <Typography level="h3" fontWeight="lg">
          Войдите в аккаунт
        </Typography>
        <br />
        <Divider>Авторизация</Divider>
        <br />
        <ButtonGroup color="primary">
          <Button variant="solid" href={"/auth/signin"} component="a">
            Войти
          </Button>
          <Button variant="solid" href={"/auth/signup"} component="a">
            Зарегистрироваться
          </Button>
        </ButtonGroup>
      </Stack>
    );
  }

  return (
    <Stack minHeight="100vh" position="relative">
      <title>Сервис</title>
      <div className={styles.helloScreen}>
        <Image
          src={helloImg}
          alt="Hello image"
          className={styles.helloImg}
          width={1920}
          height={1080}
        />
        <h1 className={styles.title}>Сервис</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.subtitle}>Услуги</h2>
          <div className={styles.offers}>
            <p className={styles.offer}>Ремонт и тех. обслуживание</p>
            <p className={styles.offer}>
              Продажа автозапчастей и расходников для ТО
            </p>
            <p className={styles.offer}>Шиномонтаж</p>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              href="/new-order"
              color="primary"
              component={Link}
              variant="solid"
              className={styles.button}
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default MainPage;
