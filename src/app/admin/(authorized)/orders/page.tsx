"use client";

import { OrderService } from "@/services/user/OrderService";
import { useAuth } from "@/shared/helpers/auth";
import type { Order } from "@/shared/types/order/Order";
import { Empty } from "@/shared/ui";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Card,
  CardOverflow,
  Divider,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import styles from "./OrdersPage.module.scss";

const OrdersPage = () => {
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
      <title>Все заявки</title>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.subtitle}>Все заявки</h2>
          <div className={styles.orders}>
            {!orders && <Empty title="Заявок пока нет"></Empty>}
            {orders &&
              orders.length &&
              orders.map((order, index) => (
                <Card variant="outlined" key={index}>
                  <div className={styles.cardWrapper}>
                    <Select
                      defaultValue={order.status}
                      indicator={<KeyboardArrowDown />}
                      onChange={(event, value) => {
                        if (!value) return;
                        OrderService.changeOrderStatus(order.id, value);
                      }}
                    >
                      <Option color="warning" value={"new"}>
                        Новый
                      </Option>
                      <Option color="success" value={"confirmed"}>
                        Подтверждено
                      </Option>
                      <Option color="danger" value={"rejected"}>
                        Отклонено
                      </Option>
                    </Select>
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

export default OrdersPage;
