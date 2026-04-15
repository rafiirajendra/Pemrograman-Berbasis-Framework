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
    try {
        const products = await retrieveProducts("products");

        const paths = products.map((product: { id: string }) => ({
            params: { product: product.id },
        }));

        return {
            paths,
            fallback: "blocking",
        };
    } catch (error) {
        console.error("Failed to fetch product paths during static generation:", error);

        return {
            paths: [],
            fallback: "blocking",
        };
    }
};

export const getStaticProps: GetStaticProps<DetailProdukPageProps> = async (context) => {
    const productId = context.params?.product;

    if (typeof productId !== "string") {
        return { notFound: true };
    }

    try {
        const data = await retrieveProductById("products", productId);

        if (!data) {
            return {
                notFound: true,
                revalidate: 60,
            };
        }

        return {
            props: {
                product: data as ProductType,
            },
            revalidate: 60,
        };
    } catch (error) {
        console.error("Failed to fetch product during static generation:", error);

        return {
            notFound: true,
            revalidate: 60,
        };
    }
};
