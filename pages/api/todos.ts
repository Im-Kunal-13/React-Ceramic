// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Todo = {
    id: number
    text: string
    done: boolean
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Todo[]>
) {
    res.status(200).json(
        [{ id: 1, text: "Get dinner fixings", done: false },
        { id: 2, text: "Cook dinner", done: false },
        { id: 3, text: "Eat dinner", done: false },]
    )
}
