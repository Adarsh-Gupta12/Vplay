import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    game: { type: String, required: true, unique:true },
    capacity: { type: Number, required: true},
  },
  {
    timestamps: true,
  }
);
const gameModel = mongoose.model('gameModel', gameSchema);
export default gameModel;