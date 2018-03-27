
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('codes').del()
    .then(function () {
      return knex('codeTypes').del()
        .then(function () {
          return knex('codeTypes').insert([{ code: 'LANGUAGE' }], ['id'])
            .then(function (code) {
              return knex('codes').insert([
                { value: 'EN', codeId: code[0].id },
                { value: 'NL', codeId: code[0].id },
                { value: 'FR', codeId: code[0].id }
              ]);
            });
        })
    });
};
