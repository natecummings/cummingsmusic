import mongoose from 'mongoose'

const Schema = mongoose.Schema

let songSchema = new Schema({
  title: String,
  video: String,
  sheetMusic: String,
  original: String,
  childrensSong: String,
  story: String,
  dateAdded: Date,
  description: String,
  topics: String
})

songSchema.virtual('id').get(function(){
  return this._id.toHexString()
})

songSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret.__v
    delete ret._id
  }
})


export let Song = mongoose.model("Song", songSchema)