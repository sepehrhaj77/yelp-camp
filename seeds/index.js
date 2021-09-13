const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 30) + 10
        const camp = new Campground({
            author: '6136910b56a2a43938483747',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste dolores officia suscipit sit repudiandae consequuntur perspiciatis nostrum natus magni sequi sapiente, praesentium id laborum inventore soluta nulla at vitae qui.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/drycd5dcl/image/upload/v1631205167/YelpCamp/qw1ohkruknspsd8wnpl5.png',
                  filename: 'YelpCamp/qw1ohkruknspsd8wnpl5'
                },
                {
                  url: 'https://res.cloudinary.com/drycd5dcl/image/upload/v1631204951/YelpCamp/qdsc1zmpipkjllw2p4wd.jpg',
                  filename: 'YelpCamp/qdsc1zmpipkjllw2p4wd'
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
