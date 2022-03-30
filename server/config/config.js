// Sequelize database parameters.  Also used by Sequelize-cli for migrations,
// seeds, model creation

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'stickynote',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};

