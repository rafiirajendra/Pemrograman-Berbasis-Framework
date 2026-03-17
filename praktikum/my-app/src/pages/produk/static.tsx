import TampilanProduk from "../../views/produk";
import { ProductType } from "../../types/Product.type";
import { retrieveProducts } from "@/utils/db/servicefirebase";

const halamanProdukStatic = (props:{products: ProductType[]}) => {
    const { products } = props;
    return (
        <div>
            <h1>Halaman Produk Static</h1>
            <TampilanProduk products={products} isLoading={false} detailBasePath="/produk/ssg" />
        </div>
    )
}
export default halamanProdukStatic;

export async function getStaticProps() {
    const products = await retrieveProducts("products");

    return {
        props: {
            products: products as ProductType[]
        },
        revalidate: 10,
    }

}
