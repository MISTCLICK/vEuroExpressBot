import mongoose, { Document } from 'mongoose';

interface statINT extends Document {
  guildID: string;
  channelID: string;
  type: string;
}

const statChannelScript = new mongoose.Schema({
  guildID: { type: String, required: true },
  channelID: { type: String, required: true },
  type: { type: String, required: true }
});

export default mongoose.model<statINT>('statChannels_cfg', statChannelScript);