import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const oauthErrorMessageMap: Record<string, string> = {
    OAuthSignin: "Google sign-in gagal dimulai. Cek konfigurasi OAuth aplikasi.",
    OAuthCallback: "Google callback gagal. Cek callback URL pada Google Console.",
    OAuthCreateAccount: "Akun OAuth gagal dibuat.",
    OAuthAccountNotLinked: "Email ini sudah terdaftar dengan metode login lain.",
    Callback: "Terjadi masalah saat memproses callback login.",
};

const TampilanLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { push, query } = useRouter();
	const callbackUrl = (query.callbackUrl as string) || "/";
    const [error, setError] = useState((query.error as string) || "");

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setError("");
        setIsLoading(true);
		// const form = event.currentTarget;
		// const formData = new FormData(event.currentTarget);
		// const email = (formData.get("email") as string).trim();
		// const password = (formData.get("Password") as string).trim();

		// if (!email) {
		// 	setError("Email wajib diisi");
		// 	return;
		// }

		// if (password.length < 6) {
		// 	setError("Password minimal 6 karakter");
		// 	return;
		// }

		// setIsLoading(true);
		try {
			const res = await signIn("credentials", {
				redirect: false,
                email: event.currentTarget.email.value,
                password: event.currentTarget.Password.value,
                callbackUrl,
			});

			// const result = (await response.json()) as {
			// 	status?: "success" | "error";
			// 	message?: string;
			// };

			if (!res?.error) {
				setIsLoading(false);
				push(callbackUrl);
			} else {
				setIsLoading(false);
                setError(res.error || "Login failed");
			}
		} catch (error){
			setIsLoading(false);
            setError("wrong email or password");
		}
	};

    const handleGoogleSignIn = async () => {
        setError("");
        setIsLoading(true);
        await signIn("google", { callbackUrl });
    };

    const handleGithubSignIn = async () => {
        setError("");
        setIsLoading(true);
        await signIn("github", { callbackUrl });
    };

    const displayedError = oauthErrorMessageMap[error] || error;

	return (
            <div className={style.login}>
				{displayedError && <p className={style.login__error}>{displayedError}</p>}
                <h1 className={style.login__title}>Halaman login</h1>
                <div className={style.login__form}>
                    <form onSubmit={handleSubmit}>
                        <div className={style.login__form__item}>
                            <label htmlFor="email" className={style.login__form__item__label}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                                className={style.login__form__item__input}
                            />
                        </div>

                        <div className={style.login__form__item}>
                            <label htmlFor="Password" className={style.login__form__item__label}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="Password"
                                name="Password"
                                placeholder="Password"
                                minLength={6}
                                required
                                className={style.login__form__item__input}
                            />
                        </div>
                        <button type="submit" className={style.login__form__item__button} disabled={isLoading}>
                            {isLoading ? "Loading..." : "Login"}
                        </button>{" "}
                        <br /><br />
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className={style.login__form__item__button}
                            disabled={isLoading}
                            >
                            {isLoading ? "Loading..." : "sign in with google"}
                        </button>
                        <br /><br />
                        <button
                            type="button"
                            onClick={handleGithubSignIn}
                            className={style.login__form__item__button}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "sign in with github"}
                        </button>
                    </form>
                    <br />
                    <p className={style.login__form__item__text}>
                        Tidak punya {""} akun?<Link href="/auth/register">Ke Halaman Register</Link>
                    </p>
                    </div>
            </div>
    );
};

export default TampilanLogin