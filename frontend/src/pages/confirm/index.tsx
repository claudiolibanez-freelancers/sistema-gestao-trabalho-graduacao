import { GetServerSideProps } from "next";
import nookies from "nookies";

import constants from "@/constants";

import { withSSRGuest } from "@/utils/withSSRGuest";

import { Navbar } from "@/components/Navbar";

import styles from './styles.module.css';
import Link from "next/link";
import { setupAPIClient } from "@/services/api";

type ConfirmPageProps = {}

export default function ConfirmPage() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Confirmação de cadastro realizada com sucesso!
          </h2>

          <p className={styles.description}>
            Agora você já pode acessar a plataforma. <Link href="/login">Clique aqui</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest<ConfirmPageProps>(async (ctx) => {

  nookies.destroy(ctx, constants.USER);
  nookies.destroy(ctx, constants.USER_TOKEN);
  nookies.destroy(ctx, constants.USER_REFRESH_TOKEN);

  const api = setupAPIClient(ctx);

  const { email, token } = ctx.query as {
    email: string,
    token: string
  };

  await api.post(`/confirm?email=${email}&token=${token}`);

  return {
    props: {}
  }
});