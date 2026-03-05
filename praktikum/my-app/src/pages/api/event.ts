import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveEvents } from "@/utils/db/servicefirebase";

type Data = {
    status: boolean;
    status_code: number;
    data: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const data = await retrieveEvents("event");
    res.status(200).json({
        status: true,
        status_code: 200,
        data
    });
}
