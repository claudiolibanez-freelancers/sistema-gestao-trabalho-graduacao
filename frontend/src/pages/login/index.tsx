import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod';
import nookies from 'nookies';
import decode from "jwt-decode";

import constants from "@/constants";

import { api } from "@/services/apiClient";

import { withSSRGuest } from "@/utils/withSSRGuest";

import { Navbar } from "@/components/Navbar";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";

import styles from "./styles.module.css";

const loginFormSchema = z.object({
  email: z.string()
    .nonempty({ message: 'E-mail obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string()
    .nonempty({ message: 'Senha obrigatória' })
    .min(6, { message: 'Senha deve conter no mínimo 6 caracteres' }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

type LoginPageProps = {};

export default function LoginPage(props: LoginPageProps) {
  const { pathname, push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    email,
    password
  }) => {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      const { user, token, refreshToken } = response.data;

      const { roles } = decode<{ roles: string[] }>(token);

      nookies.set(null, constants.USER_TOKEN, token, {
        path: '/',
        maxAge: 86400
      });

      nookies.set(null, constants.USER_REFRESH_TOKEN, refreshToken, {
        path: '/',
        maxAge: 86400
      });

      if (user.isEmailVerified && user.isProfileCompleted) {
        console.log('email verificado, perfil completo');
        nookies.set(null, constants.USER, JSON.stringify(user), {
          path: '/',
          maxAge: 86400
        });

        push('/dashboard');
      } else if (user.isEmailVerified && !user.isProfileCompleted) {
        if (roles.length === 0) {
          push(`/student?email=${email}`);
        }
        // else if (roles.includes('teacher')) {
        //   push('/teacher');
        // }
      } else {
        push(`/verify?email=${email}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    await handleSubmit(onSubmit)();
  }

  return (
    <>
      <Navbar pageTitle={pathname} />
      <main className={styles.container}>
        <div className={styles.content}>

          <h2 className={styles.title}>Entrar</h2>

          <div className={styles.form}>
            <div className={styles.formControl}>
              <label
                htmlFor="email"
                className={styles.label}
              >
                E-mail institucional
              </label>
              <TextInput
                id='email'
                type='email'
                isError={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <span className={styles.messageError}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.formControl}>
              <label
                htmlFor="password"
                className={styles.label}
              >
                Senha
              </label>
              <TextInput
                id='password'
                type='password'
                isError={!!errors.password}
                {...register('password')}
              />
              {errors.password && (
                <span className={styles.messageError}>
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button onClick={handleLogin}>
              Entrar
            </Button>
          </div>

          <p className={styles.registerText}>Não possui cadastro? <Link href="/register" className={styles.linkRegisterText}>Clique aqui para cadastrar.</Link></p>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest<LoginPageProps>(async (ctx) => {
  return {
    props: {}
  }
});