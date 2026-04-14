import styles from "../../pages/produk/produk.module.scss";
import Link from "next/link";
import Image from "next/image";

type ProductType = {
    id: string;
    name: string;
    price: number;
    size: string;
    image: string;
    category: string;
}

interface TampilanProdukProps {
    products: ProductType[];
    isLoading: boolean;
    detailBasePath?: string;
}

const TampilanProduk = ({ products, isLoading, detailBasePath = "/produk" }: TampilanProdukProps) => {

    const SkeletonLoader = () => (
        <>
            {[...Array(6)].map((_, index) => (
                <div key={`skeleton-${index}`} className={styles.produk__content__skeleton}>
                    <div className={styles.produk__content__skeleton__image}></div>
                    <div className={styles.produk__content__skeleton__name}></div>
                    <div className={styles.produk__content__skeleton__category}></div>
                    <div className={styles.produk__content__skeleton__price}></div>
                </div>
            ))}
        </>
    );

    return (
        <div className={styles.produk}>
            <h1 className={styles.produk__title}>Daftar Produk</h1>
            <div className={styles.produk__content}>
                {isLoading ? (
                    <SkeletonLoader />
                ) : (
                    products.map((product: ProductType) => (
                        <Link
                            href={`${detailBasePath}/${product.id}`}
                            key={product.id}
                            className={styles.produk__content__item}
                        >
                            <div className={styles.produk__content__item__image}>
                                <Image src={product.image} alt={product.name} width={200} height={200} />
                            </div>
                            <h4 className={styles.produk__content__item__name}>
                                {product.name}
                            </h4>
                            <h4 className={styles.produk__content__item__size}>
                                {product.size}
                            </h4>
                            <p className={styles.produk__content__item__category}>
                                {product.category}
                            </p>
                            <p className={styles.produk__content__item__price}>
                                Rp {product.price.toLocaleString("id-ID")}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default TampilanProduk;
