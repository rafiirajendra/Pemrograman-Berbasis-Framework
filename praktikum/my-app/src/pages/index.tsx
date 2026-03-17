import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Praktikum Next.js Pages Router</title>
            </Head>
            <h1>Praktikum Next.js Pages Router</h1><br />
            <p>Mahasiswa D4 Teknik Informatika</p>
            <nav>
                <Link href="/about">Lihat Halaman About</Link>
            </nav>
        </div>
    )
}
