import { GetStaticPaths, GetStaticProps } from "next";
import { ProductType } from "@/types/Product.type";
import { retrieveProductById, retrieveProducts } from "@/utils/db/servicefirebase";
import DetailProduk from "@/views/DetailProduct";

type DetailProdukPageProps = {
    product: ProductType | null;
};

const DetailProdukSSGPage = ({ product }: DetailProdukPageProps) => {
    return <DetailProduk product={product} isLoading={false} />;
};

export default DetailProdukSSGPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await retrieveProducts("products");

    const paths = products.map((product: { id: string }) => ({
        params: { product: product.id },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<DetailProdukPageProps> = async (context) => {
    const productId = context.params?.product;

    if (typeof productId !== "string") {
        return { notFound: true };
    }

    const data = await retrieveProductById("products", productId);

    if (!data) {
        return { notFound: true };
    }

    return {
        props: {
            product: data as ProductType,
        },
    };
};
