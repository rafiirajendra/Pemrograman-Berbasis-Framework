import fetcher from "@/utils/swr/fetcher";
import { ProductType } from "@/types/Product.type";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "@/views/DetailProduct";

const DetailProdukCSRPage = () => {
    const { query, isReady } = useRouter();
    const productId = typeof query.product === "string" ? query.product : undefined;

    const { data, error, isLoading } = useSWR(
        isReady && productId ? `/api/products/${productId}` : null,
        fetcher
    );

    const product: ProductType | null = error || !data?.data ? null : data.data;

    return <DetailProduk product={product} isLoading={isLoading} />;
};

export default DetailProdukCSRPage;
