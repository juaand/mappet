require("../config/db.config");

const User = require("../models/user.model");
const Spot = require("../models/spot.model");
const Comment = require("../models/comment.model");
const Pet = require("../models/pet.model")
const faker = require("faker");

const userIds = [];

Promise.all([
  User.deleteMany(),
  Spot.deleteMany(),
  Pet.deleteMany(),
  Comment.deleteMany()
])
  .then(() => {
    console.log('empty database')

    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.sentence(),
        createdAt: faker.date.past(),
      });

      user.save()
        .then(user => {
          userIds.push(user._id);
          for(let j = 0; j < 2; j++) {
            const pet = new Pet({
              creatorId: user._id,
              animal: "dog",
              name: faker.name.firstName(),
              age: faker.random.number(),
              breed: faker.lorem.word(),
              picPath: faker.image.animals()
            })
            pet.save()
          }
          for(let j = 0; j < 3; j++) {
            const spot = new Spot({
              creatorId: user._id,
              name: faker.name.title(),
              content: faker.lorem.paragraph(),
              pictures: faker.random.image(),
              url: faker.internet.url(),
              rate: faker.random.number(),
              phone: faker.phone.phoneNumber(),
              city: faker.address.city(),
              address: faker.address.streetAddress(),
              zipCode: faker.address.zipCode(),
              days: "mon-sat",
              open: "10:00-14:00",
              snap: "14:00-16:00",
              close: "16:00-20:30", 
              createdAt: faker.date.past(),
            });
            spot.save()
              .then(p => {
                for (let k = 0; k < 3; k++) {
                  const comment = new Comment({
                    authorId: userIds[Math.floor(Math.random() * userIds.length)],
                    spotId: p._id,
                    content: faker.lorem.paragraph(),
                    createdAt: faker.date.past(),
                  });

                  comment.save();
                }
              })
          }
        })
    }
  })