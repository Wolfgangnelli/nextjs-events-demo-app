// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { buildFeedbackPath, extractFeedback } from '../../utils'
import fs from 'fs'


type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'POST') {
    const email = req.body.email
    const feedback = req.body.feedback

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback
    }

    // create path for my file
    const filePath = buildFeedbackPath()
    // read data stored in that file
    const data = extractFeedback(filePath)
    data.push(newFeedback)
    // store that in this file on a disc
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Success!' })
  } else {
    res.status(200).json({ message: 'ok' })
  }
}
