const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  origin: 'http://localhost:3001',
};

app.use(cors(corsOptions));

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/sliders', express.static('sliders'));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require('./app/models');
const Role = db.role;

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  });

  Role.create({
    id: 2,
    name: 'moderator',
  });

  Role.create({
    id: 3,
    name: 'admin',
  });
}

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/post.routes')(app);
require('./app/routes/upload.routes')(app);
require('./app/routes/slider.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/item.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
