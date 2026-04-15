import { GetServerSideProps } from "next";
import { ProductType } from "@/types/Product.type";
import { retrieveProductById } from "@/utils/db/servicefirebase";
import DetailProduk from "@/views/DetailProduct";

type DetailProdukPageProps = {
    product: ProductType | null;
};

const DetailProdukPage = ({ product }: DetailProdukPageProps) => {
    return <DetailProduk product={product} isLoading={false} />;
};

export default DetailProdukPage;

export const getServerSideProps: GetServerSideProps<DetailProdukPageProps> = async (context) => {
    const productId = context.params?.product;

    if (typeof productId !== "string") {
        return { notFound: true };
    }

    const product = await retrieveProductById("products", productId);

    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            product: product as ProductType,
        },
    };
};