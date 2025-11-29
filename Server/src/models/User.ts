import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin' | 'restaurant_owner';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'restaurant_owner'], default: 'user' },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
