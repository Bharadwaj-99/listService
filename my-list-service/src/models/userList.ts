import mongoose, { Schema, Document } from 'mongoose';

export interface UserListDocument extends Document {
  userId: string;
  contentId: string;
  contentType: 'Movie' | 'TVShow';
  addedAt: Date;
}

const UserListSchema: Schema = new Schema({
  userId: { type: String, required: true },
  contentId: { type: String, required: true },
  contentType: { type: String, required: true, enum: ['Movie', 'TVShow'] },
  addedAt: { type: Date, required: true, default: Date.now },
});

export const UserList = mongoose.model<UserListDocument>('UserList', UserListSchema);