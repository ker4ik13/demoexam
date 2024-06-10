"use client";

import { OrderService } from "@/services/user/OrderService";
import { getColorFromStatus, getLabelFromOrderStatus } from "@/shared/helpers";
import { useAuth } from "@/shared/helpers/auth";
import type { Order } from "@/shared/types/order/Order";
import { Empty } from "@/shared/ui";
import {
  Button,
  ButtonGroup,
  Card,
  CardOverflow,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./MyOrdersPage.module.scss";

const MyOrdersPage = () => {
  const { user, isAuth } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  const getMyOrders = () => {
    const myOrders = OrderService.getOrders();
    if (!myOrders) return;
    setOrders(myOrders);
  };

  useEffect(getMyOrders, []);

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
      <title>Мои заявки</title>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.string}>
            <h2 className={styles.subtitle}>Мои заявки</h2>
            {orders && orders.length > 0 && (
              <Button
                variant="solid"
                color="primary"
                href="/new-order"
                component={Link}
              >
                Оставить заявку
              </Button>
            )}
          </div>
          <div className={styles.orders}>
            {!orders ||
              (orders.length === 0 && (
                <Empty title="Ваших заявок пока нет">
                  <Button
                    variant="solid"
                    color="primary"
                    href="/new-order"
                    component={Link}
                  >
                    Оставить заявку
                  </Button>
                </Empty>
              ))}
            {orders &&
              orders.length > 0 &&
              orders.map((order, index) => (
                <Card variant="outlined" key={index}>
                  <div className={styles.cardWrapper}>
                    <Chip color={getColorFromStatus(order.status)}>
                      {getLabelFromOrderStatus(order.status)}
                    </Chip>
                    <p className={styles.orderUser}>
                      {`${order.lastname} ${order.firstname} ${order.thirdname}`}
                      <span>{`, ${order.phone}`}</span>
                    </p>
                    <p className={styles.orderCar}>{order.car}</p>
                  </div>
                  <CardOverflow
                    variant="outlined"
                    sx={{
                      padding: 1,
                    }}
                  >
                    {new Date(order.date).toLocaleDateString("ru")},{" "}
                    {order.time}
                  </CardOverflow>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default MyOrdersPage;
