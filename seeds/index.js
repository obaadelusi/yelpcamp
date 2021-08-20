const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
   console.log('Database connected...');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
   await Campground.deleteMany({});
   for (let i = 0; i < 50; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
         author: '611c349dbef9517ad8d8f72e',
         location: `${cities[random1000].city}, ${cities[random1000].state}`,
         title: `${sample(descriptors)} ${sample(places)}`,
         description:
            "It's always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn't have to worry. Only the slowest in the group do. That was the lesson they were about to learn that day.",
         price: price,
         images: [
            {
               url: 'https://res.cloudinary.com/dg9aehsyd/image/upload/v1629489000/YelpCamp/tud3mcq1ug2gnjfqlv36.jpg',
               filename: 'YelpCamp/tud3mcq1ug2gnjfqlv36'
            },
            {
               url: 'https://res.cloudinary.com/dg9aehsyd/image/upload/v1629489001/YelpCamp/xcwixbpcufdmo1vzixhm.jpg',
               filename: 'YelpCamp/xcwixbpcufdmo1vzixhm'
            }
         ]
      });
      await camp.save();
   }
};

seedDB().then(() => {
   mongoose.connection.close();
});
