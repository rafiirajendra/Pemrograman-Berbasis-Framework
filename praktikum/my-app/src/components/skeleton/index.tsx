import styles from "./skeleton.module.scss";

const Skeleton = () => {
    // Tampilkan 6 skeleton items saat loading
    const skeletonCount = Array.from({ length: 6 });

    return (
        <div className={styles.skeleton__container}>
            {skeletonCount.map((_, index) => (
                <div key={index} className={styles.skeleton__item}>
                    <div className={styles.skeleton__image}></div>
                    <div className={styles.skeleton__name}></div>
                    <div className={styles.skeleton__size}></div>
                    <div className={styles.skeleton__category}></div>
                    <div className={styles.skeleton__price}></div>
                </div>
            ))}
        </div>
    );
};

export default Skeleton;
