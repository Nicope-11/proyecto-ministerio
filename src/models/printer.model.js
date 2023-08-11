import mongoose from 'mongoose';

const printerSchema = new mongoose.Schema(
  {
    nroinventario: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    nroserie: {
      type: String,
      trim: true,
      required: true,
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Maker',
      required: true,
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Model',
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true,
    },
    /* user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }, */
  },
  { timestamps: true }
);

printerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Printer', printerSchema);
