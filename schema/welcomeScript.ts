import mongoose, { Document } from 'mongoose';

export interface settings {
  welcome?: {
    channelID: string;
    text?: string;
    role?: string;
  },
  leave?: {
    channelID: string;
    text?: string;
  }
}

export interface welcomeINT extends Document {
  guildID: string;
  settingsObj: settings;
}

const welcomeScript = new mongoose.Schema({
  guildID: { type: String, required: true },
  settingsObj: { type: Object, required: true }
});

/*
structure of settingsObj
{
  welcome: {
    channelID: String
    text: String
    role: String
  },
  leave: {
    channelID: String
    text: String
  }
}
*/

export default mongoose.model<welcomeINT>('welcome_cfg', welcomeScript);