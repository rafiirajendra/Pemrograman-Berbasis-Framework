import head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import aboutStyles from "./about.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1>Praktikum Next.js Pages Router</h1><br />
      <p>Mahasiswa D4 PBF</p>
      <nav className={aboutStyles.nav}>
        <Link href="/about" className={aboutStyles.link}>
          → Lihat Halaman About
        </Link>
      </nav>  
    </div>
  )
}

