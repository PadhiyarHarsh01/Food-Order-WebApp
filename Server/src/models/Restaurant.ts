import mongoose, { Schema, Document } from 'mongoose';

interface IRestaurant extends Document {
  name: string;
  description: string;
  image: string;
  address: string;
  city: string;
  cuisines: string[];
  rating: number;
  deliveryTime: number;
  minimumOrder: number;
  isOpen: boolean;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    cuisines: { type: [String], required: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    deliveryTime: { type: Number, required: true, default: 30 },
    minimumOrder: { type: Number, default: 0 },
    isOpen: { type: Boolean, default: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
