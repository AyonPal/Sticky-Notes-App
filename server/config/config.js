// Sequelize database parameters.  Also used by Sequelize-cli for migrations,
// seeds, model creation

module.exports = {
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
