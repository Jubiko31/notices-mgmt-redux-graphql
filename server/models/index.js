const { connect, Sequelize: DataTypes } = require('../config/db');
const Notes = require('./NotesModel')(connect, DataTypes);
const Category = require('./CategoryModel')(connect, DataTypes);

Category.belongsTo(Notes, { foreignKey: 'id' });

module.exports = { Notes, Category };
