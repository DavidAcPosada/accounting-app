import dbConnect from '../../../utils/dbConnect'
import Product from '../../../models/Product'
import Establishment from '../../../models/Establishment'

dbConnect()

export default async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const establishmentActive = await Establishment.findOne({ active: true })
        const products = await Product.find({ establishment_id: establishmentActive._id })
        res.status(200)
          .json({
            success: true,
            data: products
          })
      } catch(err) {
        res.json({ success: false, error: err.toString() })
      }
      break;
    default:
    res.status(400).json({ success: false, error: 'Method not allowed' })
      break;
  }
}