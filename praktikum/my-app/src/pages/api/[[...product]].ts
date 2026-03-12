import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts, retrieveProductById } from "@/utils/db/servicefirebase";

type Data = {
    status: boolean;
    status_code: number;
    data: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.query.product![1]) {
        const data = await retrieveProductById("products", req.query.product![1]);
        res.status(200).json({ status: true, status_code: 200, data });
        return;
    } else {
        const data = await retrieveProducts("products");
        res.status(200).json({ status: true, status_code: 200, data });
    }
}