import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProdukView from "@/views/produk";

const produk = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { push } = useRouter();
    useEffect(() => {
        if (!isLogin) {
            push("/auth/login");
        }
    }, [isLogin, push]);
    return (
        <ProdukView />
    );
};

export default produk;