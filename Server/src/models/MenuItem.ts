import mongoose, { Schema, Document } from 'mongoose';

interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  cuisine: string;
  isVegetarian: boolean;
  restaurant: mongoose.Types.ObjectId;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    cuisine: { type: String, required: true },
    isVegetarian: { type: Boolean, default: false },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
