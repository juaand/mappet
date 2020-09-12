require('../config/db.config')
require('dotenv').config()

const User = require('../models/user.model')
const Spot = require('../models/spot.model')
const Comment = require('../models/comment.model')
const Pet = require('../models/pet.model')
const Like = require('../models/like.model')
const faker = require('faker')
const database = require('../data/mappet.json')

const userIds = []

Promise.all([
  User.deleteMany(),
  Spot.deleteMany(),
  Pet.deleteMany(),
  Comment.deleteMany(),
  Like.deleteMany()
])
  .then(() => {
    console.log('empty database')
    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: faker.date.past()
      })

      user.save().then((user) => {
        userIds.push(user._id)
        for (let j = 0; j < 3; j++) {
          const pet = new Pet({
            creatorId: user._id,
            animal: faker.random.arrayElement(['Dog', 'Cat', 'Bird']),
            name: faker.name.firstName(),
            age: faker.random.number(),
            breed: faker.lorem.word(),
            avatar: faker.random.image('animal')
          })
          pet.save()
        }
      })
    }
  })
  .then(() => {
    User.create({
      name: 'mappet admin',
      username: 'admin',
      avatar: process.env.ADMINAVATAR,
      email: process.env.NM_USER,
      password: process.env.NM_PASS,
      bio: 'This is an admin profile',
      role: 'ADMIN',
      activation: {
        active: true
      }
    }).then((user) => {
      for (let j = 0; j < database.length; j++) {
        const spot = new Spot({
          creatorId: user._id,
          name: database[j].properties.name,
          content: faker.lorem.paragraph(),
          pictures: faker.random.image(),
          url: faker.internet.url(),
          category: database[j].category,
          lat: database[j].geometry.coordinates[1],
          lng: database[j].geometry.coordinates[0],
          rate: faker.random.float({ min: 0, max: 5 }).toFixed(1),
          phone: faker.phone.phoneNumber(),
          city: faker.random.arrayElement([
            'Madrid',
            'Barcelona',
            'Valencia',
            'Bilbao',
            'Sevilla',
            'A coruña',
            'Gijón',
            'Santander',
            'León',
            'Albacete'
          ]),
          address: faker.address.streetAddress(),
          zipCode: faker.address.zipCode(),
          days: faker.random.arrayElement([
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
          ]),
          open: '10:00-14:00',
          close: '16:00-20:30',
          email: faker.internet.email(),
          instagram: faker.name.firstName(),
          facebook: faker.internet.url(),
          createdAt: faker.date.past()
        })
        spot.save().then((p) => {
          for (let k = 0; k < 1; k++) {
            const comment = new Comment({
              authorId: userIds[Math.floor(Math.random() * userIds.length)],
              spotId: p._id,
              content: faker.lorem.paragraph(),
              createdAt: faker.date.past()
            })
            comment.save()
          }
        })
      }
    })
  })
  .then(() => {
    console.log('users database added')
    console.log('pets database added')
    console.log('admin user added')
    console.log('spots database added')
    console.log('comments database added')
  })
