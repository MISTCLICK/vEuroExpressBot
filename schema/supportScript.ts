import mongoose, { Document } from 'mongoose';

interface supData extends Document {
  guildID: string,
  supportChannelID: string,
  supportRoleID: string,
  logChannelID: string,
  categoryID: string
}

const supportScript = new mongoose.Schema({
  guildID: { type: String, required: true },
  supportChannelID: { type: String, required: true },
  supportRoleID: { type: String, required: true },
  logChannelID: { type: String, required: true },
  categoryID: { type: String, required: true }
});

export default mongoose.model<supData>('supportcfg', supportScript);