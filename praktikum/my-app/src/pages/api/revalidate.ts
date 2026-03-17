import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    revalidated: boolean;
    message?: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            revalidated: false,
            message: "Method Not Allowed",
        });
    }

    const token = Array.isArray(req.query.token) ? req.query.token[0] : req.query.token;
    const dataParam = Array.isArray(req.query.data) ? req.query.data[0] : req.query.data;

    if (token !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({
            revalidated: false,
            message: "Insert correct token",
        });
    }

    if (dataParam === "products" || dataParam === "produk") {
        try {
            await res.revalidate("/produk/static");
            return res.status(200).json({ revalidated: true });
        } catch (err) {
            console.error("Error in API route:", err);
            return res.status(500).json({
                revalidated: false,
                message: "Failed to revalidate",
            });
        }
    }

    return res.status(400).json({
        revalidated: false,
        message: "Invalid query parameter. Expected 'data=products'.",
    });
}
