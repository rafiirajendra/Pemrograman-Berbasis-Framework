import Link from "next/link";
import { useRouter } from "next/router";
// import styles from "./login.module.css";
import styles from "./login.module.scss";

const TampilanLogin = () => {
    const { push } = useRouter();
    const handlerLogin = () => {
        push("/produk");
    };

    return (
        <div className={styles.login}>
            <h1 className={styles.title}>Halaman Login</h1>
            <button onClick={()=> handlerLogin()}>Login</button><br />
            <h1 className={styles.warning}>belum punya akun?</h1>
            <Link href="/auth/register">Ke Halaman Register</Link>
        </div>
    );
}

export default TampilanLogin;