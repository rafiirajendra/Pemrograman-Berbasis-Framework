import TampilanProduk from "../../views/produk";
import { ProductType } from "../../types/Product.type";

const halamanProdukServer = (props: { products: ProductType[] }) => {
    const { products } = props;
    return (
        <div>
            <h1>Halaman Produk Server</h1>
            <TampilanProduk products={products} isLoading={false} detailBasePath="/produk/ssr" />
        </div>
    )
}

export default halamanProdukServer;

export async function getServerSideProps() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiBaseUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const res = await fetch(new URL("/api/produk", apiBaseUrl).toString());
    const response = await res.json();
    return {
        props: {
            products: response.data
        }
    }
}
