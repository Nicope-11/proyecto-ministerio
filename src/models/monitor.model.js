import mongoose from 'mongoose';

const monitorSchema = new mongoose.Schema(
  {
    nroinventario: {
      type: String,
      required: true,
    },
    nroserie: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Monitor', monitorSchema);
