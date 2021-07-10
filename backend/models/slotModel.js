import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema(
  {
    slotDate : {type: String, required: true}, 
    email: { type: String, required: true },
    game: { type: String, required: true },
    slotTime: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);
const Slot = mongoose.model('Slot', slotSchema);
export default Slot;