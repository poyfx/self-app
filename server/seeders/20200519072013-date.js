'use strict';
const md5 = require('md5')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('users',[
     {
        username:'poyfx',
        password:md5('123456'),
        createdAt:new Date(),
       updatedAt:new Date()
     },
     {
       username:'pp',
       password:md5('123456'),
       createdAt:new Date(),
       updatedAt:new Date()
     }
   ],{})
   .then(() => {
     return queryInterface.bulkInsert('contents',[
       {
         user_id:1,
         title:'aaaaa',
         content:'111111',
         comment_count:2,
         like_count:0,
         createdAt:new Date(),
       updatedAt:new Date()
       },
       {
          user_id:2,
          title:'bbbbbbbb',
          content:'2222222',
          comment_count:1,
          like_count:2,
          createdAt:new Date(),
        updatedAt:new Date()
        },
        {
          user_id:3,
          title:'cccccccc',
          content:'3333333',
          comment_count:1,
          like_count:1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          user_id:4,
          title:'ddddd',
          content:'44444444',
          comment_count:1,
          like_count:0,
          createdAt:new Date(),
           updatedAt:new Date()
        },
     ])
   },{}).then(() => {
    return queryInterface.bulkInsert('comments',[
      {
        content_id:1,
        user_id:1,
        comment:'评论1111111',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
       content_id:1,
       user_id:2,
       comment:'评论2222222',
       createdAt:new Date(),
       updatedAt:new Date()
     },
     {
       content_id:2,
       user_id:1,
       comment:'评论3333333333',
       createdAt:new Date(),
       updatedAt:new Date()
     }
    ])
   })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
