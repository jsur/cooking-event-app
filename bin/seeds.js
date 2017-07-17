require('dotenv').config({'path': '.env'});
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const User = require('../models/User');
const Event = require('../models/Event');

User.remove({});

Event.remove({});

const users = [
  {
    'email': 'camille@hotmail.com',
    'password': 'password',
    'username': 'camille',
    'firstname': 'Camille',
    'lastname': 'Smith'
  },
  {
    'email': 'micaela@hotmail.com',
    'password': 'password',
    'username': 'micaela',
    'firstname': 'Micaela',
    'lastname': 'Doe'
  },
  {
    'email': 'julius@hotmail.com',
    'password': 'password',
    'username': 'julius',
    'firstname': 'Julius',
    'lastname': 'Williams'
  },
  {
    'email': 'matt@hotmail.com',
    'password': 'password',
    'username': 'matt',
    'firstname': 'Matt',
    'lastname': 'Johnson'
  },
  {
    'email': 'sophia@hotmail.com',
    'password': 'password',
    'username': 'sophia',
    'firstname': 'Sophia',
    'lastname': 'Brown'
  },
  {
    'email': 'olivia@hotmail.com',
    'password': 'password',
    'username': 'olivia',
    'firstname': 'Olivia',
    'lastname': 'Davis'
  }
];

const events = [
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Taste of Brazil',
    'foodtype': ['Brazilian'],
    'price': 35,
    'description': 'Brazilian chefs came direct from Brazil to show what is on on their original state and its original foods. Things that you dont find in restaurants in Barcelona. Fine Dinning showing simple ingredients transformed in beautiful dishes. Atmosphere warm and friendly with brazilian style.',
    'location': {
      'type': 'Point',
      'coordinates': [2.1645279, 41.3902667]
    },
    'attendees': ['59689ed42850907a7e7aa67c', '5968cad1a172577f721e735d', '5968cad1a172577f721e735f'],
    'date': '2017-07-08 20:00:00'
  },
  {
    'owner': ['5968cad1a172577f721e735d'],
    'title': 'Club Lola',
    'foodtype': ['International'],
    'price': 35,
    'description': 'At Club Tropicana the drinks might be free, but at Club Lola it\'s all about the food. I serve up fuss-free freakishly good food that\'s bursting with flavour, creativity and a touch of shabby-chic finesse (does that even count as finesse??). Bring your friends, brothers and lovers, sip a drink in my garden and make a winter night even more special with a session at Club Lola.',
    'location': {
      'type': 'Point',
      'coordinates': [2.1827595, 41.3817381]
    },
    'attendees': ['59689ed42850907a7e7aa67c', '5968cad1a172577f721e7362', '5968cad1a172577f721e735f'],
    'date': '2017-07-14 21:00:00'
  },
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Pizza Night',
    'foodtype': ['Italian'],
    'price': 35,
    'description': 'Try your hand at spinning pizza, making antipasti and pavlova at the Solo Supper Club’s Al fresco event. We’ll fire up the clay pizza oven and create an Italian style menu in blooming surroundings. During the course of the evening we\'ll prepare a vibrant meal of seasonal dishes rounded off with a momentous meringue perfect for high summer. We\'ll provide guidance and ingredients, no prior knowledge is needed on your part, simply the desire to roll up your sleeves and cook among friends.',
    'location': {
      'type': 'Point',
      'coordinates': [2.1664345, 41.3857813]
    },
    'attendees': ['59689ed42850907a7e7aa67c', '5968cad1a172577f721e735e', '5968cad1a172577f721e7362'],
    'date': '2017-07-02 20:30:00',
    'image': {
      'name': 'pizza-night',
      'path': '/uploads/pizza-night.jpg'
    }
  },
  {
    'owner': ['5968cad1a172577f721e735d'],
    'title': 'Garden Party',
    'foodtype': ['Mediterranean'],
    'price': 35,
    'description': 'A scientist come farmer, and eco-chef and a 26 grains chef all come into a room, cook you delicious food and take your on a journey into the world of grains like you have never experienced before. An intimate evening of dining, storytelling and sharing.Grains, our unsung heroes, play centre stage. Usually associated with white flour and stodge, The Sustainable Food Story team are showcasing how delicate, nourishing and delicious grains can be. Think along the lines of rye crumb radishes, potted spelt with under-utilised cheese and toasted einkorn cheesecake with brown bread icecream.',
    'location': {
      'type': 'Point',
      'coordinates': [2.1743078, 41.4009404]
    },
    'attendees': ['59689ed42850907a7e7aa67c', '5968cad1a172577f721e7362', '5968cad1a172577f721e735f'],
    'date': '2017-07-01 14:00:00'
  },
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Experimental Dinner',
    'foodtype': ['International'],
    'price': 35,
    'description': 'I am passionate about food and cooking, and I would love to welcome you to my place for a fun and new dinning experience! I have created some interesting recipes that I would love to share with you!! Come and Have Fun!!! There is some molecular cooking involved. I could share the recipes if interested! ;) My flat is located in a converted warehouse, with high ceiling and beams. Great atmosphere and great way to meet new people with common interests!',
    'location': {
      'type': 'Point',
      'coordinates': [2.1652941, 41.3941512]
    },
    'attendees': ['59689ed42850907a7e7aa67c', '5968cad1a172577f721e735e', '5968cad1a172577f721e735f'],
    'date': '2017-07-29 20:00:00'
  },
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Giant Brunch',
    'foodtype': ['Brunch'],
    'price': 35,
    'description': 'Little Flute gives Barceloners the unique opportunity to experience the diversity of Prosecco and its sparkling peers with a carefully selected tasting menu and brunch inspired dishes. It is the first of its kind - a fun quality brunch experience with a sparkling twist. Little Flute’s menu takes the much-loved traditional brunch and adds flavours specifically chosen to enhance its relationship with sparkling wine. Our produce is seasonal, homemade and organic when possible to be so and our brunch dishes are intentionally light leaving room for the bubbles.',
    'location': {
      'type': 'Point',
      'coordinates': [2.2014381, 41.3951386]
    },
    'attendees': ['5968cad1a172577f721e7361', '5968cad1a172577f721e735e', '5968cad1a172577f721e735f'],
    'date': '2017-07-23 11:00:00'
  },
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Italian Family Dinner',
    'foodtype': ['Italian'],
    'price': 35,
    'description': 'At the heart of the Fetta Di Casa experience is a celebration of the humble Italian family dinner. We seat our guests around a communal table, meaning that you share your dinner experience with both friends and strangers, all bound together by a love of authentic home-cooked Italian food. This month’s unique menu is a celebration of the Italian summer, with regional antipasti dishes as well as a main course choice between mussels with baked rice or a slow-cooked lentil casserole. To finish, you’ll be treated to the ultimate refreshing summer palette cleanser of marsala cream and peach cups.',
    'location': {
      'type': 'Point',
      'coordinates': [2.1620006, 41.4065883]
    },
    'attendees': ['5968cad1a172577f721e7361', '5968cad1a172577f721e7360', '5968cad1a172577f721e735f'],
    'date': '2017-08-05 20:30:00'
  },
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Taco Tuesday',
    'foodtype': ['Mexican'],
    'price': 35,
    'description': 'Help us celebrate the holiest day of the week in the taco calendar: Tuesday At HolyTaco\'s next supper club. Expect a fun evening celebrating the humble taco in all its glory... Guest will enjoy a four-course line-up of delicious, seasonal tacos, with all the trimmings. Using ingredients sourced from local, south Barcelona suppliers ensures that whilst our tacos are Inspired By Mexico, they\'re very much Made In Barcelona.',
    'location': {
      'type': 'Point',
      'coordinates': [2.1893282, 41.3930448]
    },
    'attendees': ['5968cad1a172577f721e735d', '5968cad1a172577f721e735e', '5968cad1a172577f721e735f'],
    'date': '2017-08-01 21:00:00'
  },
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Spices of India',
    'foodtype': ['Indian'],
    'price': 35,
    'description': 'It\'s never a good idea to bring your work home, but there are exceptions! By day Jorge is head chef at an Embassy in Mayfair which sees him create dishes for international guests and dignitaries. Previously Jorge has worked for top Barcelona restaurants including being head chef for CevicheUK. Passports & Spices Supper Club is an intimate and informal supper club that welcomes diners to his modest East Barcelona apartment alongside Regent’s Canal. Intimate and informal home setting',
    'location': {
      'type': 'Point',
      'coordinates': [2.1658517, 41.3787784]
    },
    'attendees': ['5968cad1a172577f721e7361', '5968cad1a172577f721e735e', '5968cad1a172577f721e735d'],
    'date': '2017-06-10 21:00:00'
  },
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Restaurant in Cairo, Egypt',
    'foodtype': ['Egyptian'],
    'price': 100,
    'description': 'Cairo Cairo Cairo Cairo Cairo Cairo Cairo ',
    'location': {
      'type': 'Point',
      'coordinates': [31.340002, 30.044281]
    },
    'attendees': ['5968cad1a172577f721e7361', '5968cad1a172577f721e735e', '5968cad1a172577f721e7360'],
    'date': '2017-08-12 21:00:00'
  },
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Madrid Eatz',
    'foodtype': ['Spanish'],
    'price': 100,
    'description': 'Madrid Madrid Madrid Madrid Madrid Madrid Madrid Madrid Madrid Madrid ',
    'location': {
      'type': 'Point',
      'coordinates': [-3.707398, 40.415363]
    },
    'attendees': ['5968cad1a172577f721e7361', '5968cad1a172577f721e735e', '5968cad1a172577f721e7360'],
    'date': '2017-08-11 21:00:00'
  },
  {
    'owner': ['5968cb361ef39b7f80931bda'],
    'title': 'Sitges food event 1',
    'foodtype': ['Spanish'],
    'price': 100,
    'description': 'Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges Sitges',
    'location': {
      'type': 'Point',
      'coordinates': [1.7750302332, 41.2363907211]
    },
    'attendees': ['5968cad1a172577f721e7361', '5968cad1a172577f721e735e', '5968cad1a172577f721e7360']
  }
];

User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log(user.username);
  });
  mongoose.connection.close();
});

Event.create(events, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((event) => {
    console.log(event.title);
  });
  mongoose.connection.close();
});
