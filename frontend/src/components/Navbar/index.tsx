import { useRouter } from "next/navigation";
import Link from "next/link";
import nookies, { parseCookies } from "nookies";

import constants from "@/constants";

import { Button } from "@/components/Button";
import { ProfileButton } from "@/components/ProfileButton";

import styles from "./styles.module.css";

type NavBarProps = {
  pageTitle?: string;
  email?: string;
};

export function Navbar({ pageTitle, email }: NavBarProps) {
  const router = useRouter();

  const handleNavigateToLogin = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    router.push('/login');
  };

  const handleNavigateToRegister = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    router.push('/register');
  };

  const handleNavigateToProfile = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const cookies = parseCookies();

    const user = cookies[constants.USER];

    if (!user) {
      return;
    }

    const { id } = JSON.parse(user) as {
      id: string;
    };

    router.push(`/profile/${id}`);
  };

  const handleNavigateGoBack = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    router.back();
  };

  const handleLogout = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    nookies.destroy(null, constants.USER);
    nookies.destroy(null, constants.USER_TOKEN);
    nookies.destroy(null, constants.USER_REFRESH_TOKEN);

    router.push('/');
  };

  return (
    <div className={styles.container}>
      {(pageTitle !== '/dashboard' && pageTitle !== '/profile' && pageTitle !== '/create-group' && pageTitle !== '/group-details' && pageTitle !== '/verify' && pageTitle !== '/student') && (
        <Link href="/">
          <h2 className={styles.logo}>
            SGTG
          </h2>
        </Link>
      )}

      {(pageTitle === '/verify' || pageTitle === '/student' || pageTitle === '/dashboard') && (
        <h4 className={styles.welcome}>Bem vindo(a), {email}</h4>
      )}

      {(pageTitle === '/profile' || pageTitle === '/create-group' || pageTitle === '/group-details') && (
        <div className={styles.buttonContainer}>
          <Button
            variant="outline"
            onClick={handleNavigateGoBack}
          >
            Voltar
          </Button>
        </div>
      )}

      {(pageTitle === '/verify' || pageTitle === '/student') && (
        <div className={styles.buttonContainer}>
          <Button
            variant="outline"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      )}

      {(pageTitle === '/home' || pageTitle === '/login' || pageTitle === '/register') && (
        <ul className={styles.nav}>
          <>
            {pageTitle !== '/login' && (
              <li>
                <Button
                  variant="outline"
                  onClick={handleNavigateToLogin}
                >
                  Login
                </Button>
              </li>
            )}
            {pageTitle !== '/register' && (
              <li>
                <Button
                  variant="outline"
                  onClick={handleNavigateToRegister}
                >
                  Cadastrar
                </Button>
              </li>
            )}
          </>
        </ul>
      )}

      {pageTitle === '/dashboard' && (
        <ProfileButton onClick={handleNavigateToProfile} />
      )}
    </div>
  );
}