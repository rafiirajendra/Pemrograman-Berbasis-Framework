import TampilanProduk from "@/views/produk";
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";

const Kategori = () => {
    const { data, isLoading } = useSWR("/api/produk", fetcher);

    return (
        <div>
            <TampilanProduk 
                products={data?.data || []} 
                isLoading={isLoading}
            />
        </div>
    );
};

export default Kategori;
