const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cooking-app');

const User = require('../models/user');

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


const Event = require('../models/event');

const events = [
  {
    'title': 'Taste of Brazil',
    'foodtype': ['Brazilian'],
    'price': 35,
    'description': 'Brazilian chefs came direct from Brazil to show what is on on their original state and its original foods. Things that you dont find in restaurants in Barcelona. Fine Dinning showing simple ingredients transformed in beautiful dishes. Atmosphere warm and friendly with brazilian style.'
  },
  {
    'title': 'Club Lola',
    'foodtype': ['International'],
    'price': 35,
    'description': 'At Club Tropicana the drinks might be free, but at Club Lola it\'s all about the food. I serve up fuss-free freakishly good food that\'s bursting with flavour, creativity and a touch of shabby-chic finesse (does that even count as finesse??). Bring your friends, brothers and lovers, sip a drink in my garden and make a winter night even more special with a session at Club Lola.'
  },
  {
    'title': 'Pizza Night',
    'foodtype': ['Italian'],
    'price': 35,
    'description': 'Try your hand at spinning pizza, making antipasti and pavlova at the Solo Supper Club’s Al fresco event. We’ll fire up the clay pizza oven and create an Italian style menu in blooming surroundings. During the course of the evening we\'ll prepare a vibrant meal of seasonal dishes rounded off with a momentous meringue perfect for high summer. We\'ll provide guidance and ingredients, no prior knowledge is needed on your part, simply the desire to roll up your sleeves and cook among friends.'
  },
  {
    'title': 'Garden Party',
    'foodtype': ['Mediterranean'],
    'price': 35,
    'description': 'A scientist come farmer, and eco-chef and a 26 grains chef all come into a room, cook you delicious food and take your on a journey into the world of grains like you have never experienced before. An intimate evening of dining, storytelling and sharing.Grains, our unsung heroes, play centre stage. Usually associated with white flour and stodge, The Sustainable Food Story team are showcasing how delicate, nourishing and delicious grains can be. Think along the lines of rye crumb radishes, potted spelt with under-utilised cheese and toasted einkorn cheesecake with brown bread icecream.'
  },
  {
    'title': 'Experimental Dinner',
    'foodtype': ['International'],
    'price': 35,
    'description': 'I am passionate about food and cooking, and I would love to welcome you to my place for a fun and new dinning experience! I have created some interesting recipes that I would love to share with you!! Come and Have Fun!!! There is some molecular cooking involved. I could share the recipes if interested! ;) My flat is located in a converted warehouse, with high ceiling and beams. Great atmosphere and great way to meet new people with common interests!'
  },
  {
    'title': 'Giant Brunch',
    'foodtype': ['Brunch'],
    'price': 35,
    'description': 'Little Flute gives Barceloners the unique opportunity to experience the diversity of Prosecco and its sparkling peers with a carefully selected tasting menu and brunch inspired dishes. It is the first of its kind - a fun quality brunch experience with a sparkling twist. Little Flute’s menu takes the much-loved traditional brunch and adds flavours specifically chosen to enhance its relationship with sparkling wine. Our produce is seasonal, homemade and organic when possible to be so and our brunch dishes are intentionally light leaving room for the bubbles.'
  },
  {
    'title': 'Italian Family Dinner',
    'foodtype': ['Italian'],
    'price': 35,
    'description': 'At the heart of the Fetta Di Casa experience is a celebration of the humble Italian family dinner. We seat our guests around a communal table, meaning that you share your dinner experience with both friends and strangers, all bound together by a love of authentic home-cooked Italian food. This month’s unique menu is a celebration of the Italian summer, with regional antipasti dishes as well as a main course choice between mussels with baked rice or a slow-cooked lentil casserole. To finish, you’ll be treated to the ultimate refreshing summer palette cleanser of marsala cream and peach cups.'
    },
  {
    'title': 'Taco Tuesday',
    'foodtype': ['Mexican'],
    'price': 35,
    'description': 'Help us celebrate the holiest day of the week in the taco calendar: Tuesday At HolyTaco\'s next supper club. Expect a fun evening celebrating the humble taco in all its glory... Guest will enjoy a four-course line-up of delicious, seasonal tacos, with all the trimmings. Using ingredients sourced from local, south Barcelona suppliers ensures that whilst our tacos are Inspired By Mexico, they\'re very much Made In Barcelona.'
  },
  {
    'title': 'Spices of India',
    'foodtype': ['Indian'],
    'price': 35,
    'description': 'It\'s never a good idea to bring your work home, but there are exceptions! By day Jorge is head chef at an Embassy in Mayfair which sees him create dishes for international guests and dignitaries. Previously Jorge has worked for top Barcelona restaurants including being head chef for CevicheUK. Passports & Spices Supper Club is an intimate and informal supper club that welcomes diners to his modest East Barcelona apartment alongside Regent’s Canal. Intimate and informal home setting'
  }
];

User.remove({});

User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log(user.username);
  });
  mongoose.connection.close();
});

Event.remove({});

Event.create(events, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((event) => {
    console.log(event.title);
  });
  mongoose.connection.close();
});