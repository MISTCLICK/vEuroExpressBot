import mongoose, { Document } from 'mongoose';

interface thisBooking {
  routeid: string;
  planeid: string;
  until: number;
  full_route_data: any;
}

interface acftBooking {
  planeid: string;
  until: number;
  event: boolean;
  task: boolean;
  task_id?: string;
  event_id?: string;
}

interface thisUsers extends Document {
  name: string,
  surname: string,
  email: string,
  password: string,
  callsign?: string,
  activation?: boolean,
  regdate: number,
  user_id: string,
  level: number,
  permissions: number,
  birthDay?: string,
  vatsimID: number | null,
  booking: thisBooking[];
  acft_booking?: acftBooking;
  hours: number;
  discordID: string;
  discordAuth: boolean;
}

const users = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  callsign: { type: String, default: '' },
  activation: { type: Boolean, default: false },
  regdate: { type: Number, required: true },
  user_id: { type: String, required: true },
  level: { type: Number, default: 1 },
  permissions: { type: Number, default: 1 },
  birthDay: { type: String, required: true },
  vatsimID: { type: String, default: null },
  booking: { type: [Object], default: [] },
  acft_booking: { type: Object, default: undefined },
  hours: { type: Number, default: 0 },
  discordID: { type: String, default: '' },
  discordAuth: { type: Boolean, default: false }
});

export = mongoose.model<thisUsers>('users', users);