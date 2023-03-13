const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amaunt: { type: String, required: true },
    addresses: { type: String, required: true },
    status: { type: String, default: 'pending' },
  },

  { timestamps: true }
);

module.exports = mongoose.model('User', OrderSchema);
