import dbConnect from '../../../../utils/dbConnect'
import Establishment from '../../../../models/Establishment'

dbConnect()

export default async function handler(req, res) {
  const { query: { id } } = req
  const updated = Establishment.findByIdAndUpdate(id, { active: true }, { new: true, runValidators: true })
  if (!updated) {
    return res.status(400).json(JSON.stringify({ success: false }))
  }
  res.status(200).json({ success: true })
}