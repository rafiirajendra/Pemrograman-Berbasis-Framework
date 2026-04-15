import TampilanProduk from "../../views/produk";
import { ProductType } from "../../types/Product.type";
import { retrieveProducts } from "@/utils/db/servicefirebase";

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
    const products = await retrieveProducts("products");

    return {
        props: {
            products
        }
    }
}
