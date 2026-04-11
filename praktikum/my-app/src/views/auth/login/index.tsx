import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { push, query } = useRouter();
	const callbackUrl = (query.callbackUrl as string) || "/";
    const [error, setError] = useState("");

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

	return (
            <div className={style.login}>
                {error && <p className={style.login__error}>{error}</p>}
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