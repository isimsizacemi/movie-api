const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb+srv://isimsizacemi:1234@movie-app.3ny2as6.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('MongoDB: CONNECTED');
  });
  mongoose.Promise = global.Promise;
};

