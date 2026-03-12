import { ProductType } from "../../types/Product.type";
import styles from "./detailProduct.module.scss";

interface DetailProdukProps {
    product: ProductType | null;
    isLoading: boolean;
}

const DetailProduk = ({ product, isLoading }: DetailProdukProps) => {
    if (isLoading || !product) {
        return <h1>Loading detail product...</h1>;
    }

    return (
        <>
            <h1 className={styles.title}>Detail Product</h1>
            <div className={styles.produkdetail}>
                <div className={styles.produkdetail__image}>
                    <img src={product.image && product.image} alt={product.name} />
                </div>

                <div className={styles.produkdetail__info}>
                    <h1 className={styles.produkdetail__name}>{product.name}</h1>
                    <p className={styles.produkdetail__size}>{product.size}</p>
                    <p className={styles.produkdetail__category}>{product.category}</p>
                    <p className={styles.produkdetail__price}>
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DetailProduk;
