import mongoose from 'mongoose'

const EstablishmentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.ObjectId
  },
  name: {
    type: String,
    required: [true, 'Este campo es requerido']
  },
  active: {
    type: Boolean,
    required: [true, 'Este campo es requerido'],
    default: false
  }
})

module.exports = mongoose.models.Establishment || mongoose.model('Establishment', EstablishmentSchema)