const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.post = require('../models/post.model.js')(sequelize, Sequelize);
db.images = require('../models/image.model.js')(sequelize, Sequelize);
db.sliders = require('../models/slider.model.js')(sequelize, Sequelize);
db.category = require('../models/category.model.js')(sequelize, Sequelize);
db.item = require('../models/item.model.js')(sequelize, Sequelize);
db.event = require('../models/event.model.js')(sequelize, Sequelize);
db.photo = require('../models/photo.model')(sequelize, Sequelize);
db.page = require('../models/page.model.js')(sequelize, Sequelize);
db.textandimage = require('../models/textandimage.model.js')(
  sequelize,
  Sequelize
);
db.informations = require('../models/information.model')(sequelize, Sequelize);
db.testimonial = require('../models/testimonial.model')(sequelize, Sequelize);
db.companyimage = require('../models/companyimage.model')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.category.hasMany(db.item, { foreignKey: 'categoryId' });
db.item.belongsTo(db.category, {
  foreignKey: 'categoryId',
});

db.event.hasMany(db.photo, { foreignKey: 'eventId', onDelete: 'CASCADE' });
db.photo.belongsTo(db.event, {
  foreignKey: 'eventId',
  onDelete: 'CASCADE',
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
