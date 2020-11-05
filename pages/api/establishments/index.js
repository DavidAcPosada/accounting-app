import dbConnect from '../../../utils/dbConnect'
import Establishment from '../../../models/Establishment'

dbConnect()

export default async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const establishments = await Establishment.find({})
        res.status(200).json({
          success: true,
          data: establishments
        })
      } catch (error) {
        res.status(400).json({ success: false, error: error.toString() })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}