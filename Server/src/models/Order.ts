import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  menuItem: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  specialInstructions: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [
      {
        menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    specialInstructions: String,
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);
