
const faker = require('faker');

exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(() => {
      const users = [];
      const roles = ['ADMIN', 'USER'];

      for (let i = 0; i < 50; i += 1) {
        const randomRole = Math.floor(Math.random() * roles.length);
        users.push({
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          password: faker.internet.password(),
          hasAccess: faker.random.boolean(),
          role: roles[randomRole],
        });
      }

      users.push({
        email: 'development@icapps.com',
        firstName: 'development',
        lastName: 'iCapps',
        password: '$2b$10$GuXy0I0Dau6aA3EhmvrRkuEYQlEvNpZk/Vkx64ut4rcU0hNdFYxNO', // developer
        hasAccess: true,
        role: 'ADMIN',
      });

      // Inserts seed entries
      return knex('users').insert(users);
    });
};
