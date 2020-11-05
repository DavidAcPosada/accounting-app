import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: [true, 'Este campo es obligatorio']
  },
  price: {
    type: Number,
    required: [true, 'Este campo es obligatorio']
  },
  stock: {
    type: Number,
    required: [true, 'Este campo es obligatorio']
  },
  establishment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Establishment'
  }
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)