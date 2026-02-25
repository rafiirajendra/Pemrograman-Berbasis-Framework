import Link from "next/link";
import styles from "./register.module.scss";

const TampilanRegister = () => {
	return (
		<div className={styles.register}>
			<h1>Halaman Register</h1>
			<form>
				<div>
					<label htmlFor="name">Nama</label>
					<input id="name" name="name" type="text" placeholder="Nama lengkap" />
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input id="email" name="email" type="email" placeholder="nama@email.com" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input id="password" name="password" type="password" placeholder="Minimal 8 karakter" />
				</div>
				<button type="submit">Register</button>
			</form>
			<Link href="/auth/login">Ke Halaman Login</Link>
		</div>
	);
};

export default TampilanRegister;
