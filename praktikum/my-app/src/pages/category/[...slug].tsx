import { useRouter } from "next/router";

const halamanKategori = () => {
    const { query } = useRouter();

    const slugList = Array.isArray(query.slug) ? query.slug : [];

    return (
        <div>
            <h1>Halaman Kategori</h1>
            {slugList.length === 0 ? (
                <p>Belum ada parameter URL.</p>
            ) : (
                <ul>
                    {slugList.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default halamanKategori;