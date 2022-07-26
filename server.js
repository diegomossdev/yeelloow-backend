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
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// database
// const db = require('./app/models');

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db');
// });

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
require('./app/routes/event.routes')(app);
require('./app/routes/page.routes')(app);
require('./app/routes/textandimage.routes')(app);
require('./app/routes/information.routes')(app);
require('./app/routes/testimonial.routes')(app);
require('./app/routes/companyimage.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
