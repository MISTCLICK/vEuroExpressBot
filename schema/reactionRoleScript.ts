import mongoose, { Document } from 'mongoose';

export interface reaction {
  role_id: string;
  emoji: string;
}

export interface settings {
  channelID: string;
  reactions: reaction[];
}

export interface rrInt extends Document {
  guildID: string;
  channelID: string;
  reactions: reaction[];
}

const rrScript = new mongoose.Schema({
  guildID: { type: String, required: true },
  channelID: { type: String, required: true },
  reactions: { type: Array, default: [] }
});


export default mongoose.model<rrInt>('rr_settings', rrScript);