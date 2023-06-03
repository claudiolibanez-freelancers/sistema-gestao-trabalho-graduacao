import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Navbar } from "@/components/Navbar";

import styles from './styles.module.css';

type DashboardPageProps = {};

export default function DashboardPage() {
  const { pathname } = useRouter();

  return (
    <>
      <Navbar pageTitle={pathname} />
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.card}>
            <p>teste</p>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<DashboardPageProps>(async (ctx) => {
  return {
    props: {}
  }
});