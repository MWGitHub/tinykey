module.exports = {
  test: {
    client: 'pg',
    connection: {
      user: 'root',
      password: 'password',
      database: 'tinykey_test'
    }
  },
  development: {
    client: 'pg',
    connection: {
      user: 'root',
      password: 'password',
      database: 'tinykey_dev'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};