"use client";

import { OrderService } from "@/services/user/OrderService";
import { useAuth } from "@/shared/helpers/auth";
import type { CreateOrder, Order } from "@/shared/types/order/Order";
import { CarCrash, DateRange, Phone } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { BsClock } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import styles from "./NewOrderPage.module.scss";

const NewOrderPage = () => {
  const { user, isAuth } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors: formErrors },
  } = useForm<CreateOrder>({
    mode: "onBlur",
  });

  const onSubmit = (values: CreateOrder) => {
    const newOrder: Order = {
      ...values,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      status: "new",
    };

    const order = OrderService.saveOrder(newOrder);

    if (order) {
      reset({
        firstname: "",
        lastname: "",
        car: "",
        created_at: "",
        date: "",
        description_problem: "",
        status: "new",
        thirdname: "",
        time: "",
        phone: "",
      });
    }
  };

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
      <title>Оставить заявку</title>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.subtitle}>Записаться</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs}>
            <div className={styles.string}>
              {/* Фамилия */}
              <FormControl
                orientation="vertical"
                error={formErrors.lastname ? true : false}
              >
                <FormLabel>Фамилия</FormLabel>
                <Input
                  placeholder="Иванов"
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "Поле обязательно для заполнения",
                    },
                  })}
                  startDecorator={<FaUser />}
                  required
                />
                {formErrors.lastname && (
                  <FormHelperText>{formErrors.lastname.message}</FormHelperText>
                )}
              </FormControl>
              {/* Имя */}
              <FormControl
                orientation="vertical"
                error={formErrors.firstname ? true : false}
              >
                <FormLabel>Имя</FormLabel>
                <Input
                  placeholder="Иван"
                  {...register("firstname", {
                    required: {
                      value: true,
                      message: "Поле обязательно для заполнения",
                    },
                  })}
                  startDecorator={<FaUser />}
                  required
                />
                {formErrors.firstname && (
                  <FormHelperText>
                    {formErrors.firstname.message}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Отчество */}
              <FormControl
                orientation="vertical"
                error={formErrors.thirdname ? true : false}
              >
                <FormLabel>Имя</FormLabel>
                <Input
                  placeholder="Иванович"
                  {...register("thirdname", {
                    required: {
                      value: true,
                      message: "Поле обязательно для заполнения",
                    },
                  })}
                  startDecorator={<FaUser />}
                  required
                />
                {formErrors.thirdname && (
                  <FormHelperText>
                    {formErrors.thirdname.message}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <br />
            {/* Телефон */}
            <FormControl
              orientation="vertical"
              error={formErrors.phone ? true : false}
            >
              <FormLabel>Телефон</FormLabel>
              <Input
                type="tel"
                placeholder="8 999 999 99 99"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                  },

                  pattern:
                    /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/,
                })}
                startDecorator={<Phone />}
                required
              />
              {formErrors.phone && (
                <FormHelperText>{formErrors.phone.message}</FormHelperText>
              )}
            </FormControl>
            <br />
            <div className={styles.string}>
              {/* Дата */}
              <FormControl
                orientation="vertical"
                error={formErrors.date ? true : false}
              >
                <FormLabel>Дата</FormLabel>
                <Input
                  type="date"
                  placeholder="31.12.2024"
                  {...register("date", {
                    required: {
                      value: true,
                      message: "Поле обязательно для заполнения",
                    },
                  })}
                  startDecorator={<DateRange />}
                  required
                />
                {formErrors.date && (
                  <FormHelperText>{formErrors.date.message}</FormHelperText>
                )}
              </FormControl>
              {/* Время */}
              <FormControl
                orientation="vertical"
                error={formErrors.time ? true : false}
              >
                <FormLabel>Время</FormLabel>
                <Input
                  type="time"
                  placeholder="12:40"
                  {...register("time", {
                    required: {
                      value: true,
                      message: "Поле обязательно для заполнения",
                    },
                  })}
                  startDecorator={<BsClock />}
                  required
                />
                {formErrors.time && (
                  <FormHelperText>{formErrors.time.message}</FormHelperText>
                )}
              </FormControl>
            </div>
            <br />
            {/* Автомобиль */}
            <FormControl
              orientation="vertical"
              error={formErrors.car ? true : false}
            >
              <FormLabel>Автомобиль</FormLabel>
              <Input
                placeholder="Toyota Camry"
                {...register("car", {
                  required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                  },
                })}
                startDecorator={<CarCrash />}
                required
              />
              {formErrors.car && (
                <FormHelperText>{formErrors.car.message}</FormHelperText>
              )}
            </FormControl>
            <br />
            {/* Проблема */}
            <FormControl
              orientation="vertical"
              error={formErrors.description_problem ? true : false}
            >
              <FormLabel>Проблема</FormLabel>
              <Textarea
                placeholder="Не работает..."
                {...register("description_problem", {
                  required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                  },
                })}
                required
              />
              {formErrors.description_problem && (
                <FormHelperText>
                  {formErrors.description_problem.message}
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <Button
              color="primary"
              variant="solid"
              className={styles.button}
              type="submit"
            >
              Оставить заявку
            </Button>
          </form>
        </div>
      </div>
    </Stack>
  );
};

export default NewOrderPage;
