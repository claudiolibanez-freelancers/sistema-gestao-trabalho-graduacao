import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { Navbar } from "@/components/Navbar";

type ProfilePageProps = {};

export default function Profile() {
  const { pathname } = useRouter();

  return (
    <>
      <Navbar pageTitle={pathname} />
      <div>
        teste
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth<ProfilePageProps>(async (ctx) => {
  return {
    props: {}
  }
});