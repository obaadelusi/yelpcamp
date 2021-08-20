const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
   url: String,
   filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
   return this.url.replace('/upload', '/upload/c_thumb,g_center,w_150,h_150');
});

const CampgroundSchema = new Schema({
   title: String,
   price: Number,
   images: [ImageSchema],
   description: String,
   location: String,
   author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   reviews: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Review'
      }
   ]
});

// After deleting a campground. Do this...
CampgroundSchema.post('findOneAndDelete', async function (doc) {
   if (doc) {
      await Review.deleteMany({
         _id: { $in: doc.reviews }
      });
   }
});

module.exports = mongoose.model('Campground', CampgroundSchema);