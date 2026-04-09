// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from '@/utils/db/servicefirebase'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	status: "success" | "error"
	message: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if(req.method === "POST"){
		await signUp(req.body, (result) => {
			if(result.status === "success") {
				res.status(200).json({ status: "success", message: result.message });
			} else {
				res.status(400).json({ status: "error", message: result.message });
			}
		});
	}
	else {
		res.status(405).json({ status: "error", message: "Method not allowed" });
	}
}
