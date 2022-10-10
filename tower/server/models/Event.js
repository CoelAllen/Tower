import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const EventSchema = new Schema({

  creatorId: { type: ObjectId, required: true, ref: 'Account'},
  name: { type:String, minlength: 2, required: true },
  description: { type: String, minlength: 1, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true, default: 1},
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },
  startDate: { type: String, required: true },
  isCanceled: { type: Boolean, default: false },
  coverImg: { type: String, minlength:1, maxLength: 500, required: true},
}, SCHEMA_OPTIONS)

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})