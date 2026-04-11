import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data }: any = useSession();
  const displayName =
    data?.user?.fullname ||
    data?.user?.name ||
    data?.user?.email?.split("@")[0] ||
    "User";
  //const { data: session } = useSession()
  // console.log("session", session)
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__brand}>
        MyApp
      </div>

      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {displayName}
              {data.user.image && (
                <Image
                  src={data.user.image}
                  alt="Profile"
                  width={42}
                  height={42}
                  className={styles.navbar__user__image}
                />
              )}
            </div>
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
