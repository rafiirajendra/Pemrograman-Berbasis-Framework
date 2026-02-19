import head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1>Praktikum Next.js Pages Router</h1><br />
      <p>Mahasiswa D4 PBF</p>
      <nav style={{ marginTop: "2rem" }}>
        <Link href="/about" style={{ color: "#0070f3", textDecoration: "none", fontSize: "1.2rem" }}>
          → Lihat Halaman About
        </Link>
      </nav>  
    </div>
  )
}

