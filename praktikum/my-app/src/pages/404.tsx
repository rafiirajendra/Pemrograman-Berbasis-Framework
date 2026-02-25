import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
    return (
        <>
            <Head>
                <title>404 - Halaman Tidak Ditemukan</title>
                <meta name="description" content="Halaman yang Anda cari tidak ditemukan" />
            </Head>
            <div className={styles.error}>
                <img src="/page-not-found.png" alt="404" className={styles.error__image} />
                <h2 className={styles.error__subtitle}>Halaman Tidak Ditemukan</h2>
                <p className={styles.error__text}>Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.</p>
                <Link href="/" className={styles.error__button}>
                    Kembali ke Beranda
                </Link>
            </div>
        </>
    )
}

export default Custom404;