/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    email:{
      type: 'string',
      unique: true,
      required: true,
      isEmail:true,
      maxLength: 250,
      example: "toto@gmail.com"
  },
  name:{
    type: 'string',
    required: true,
    maxLength: 250,
    example: "SANOGO"  
    
  },
  firstName:{
    type: 'string',
    required: true,
    maxLength: 250,
    example: "MOHAMED"  
  },
  dateOfBirth:{
    type: 'number',
    isBefore : new Date()
  },
  sex:{
    type: 'string',
    isIn : ['male', 'female'],
  },
  password:{
    type: 'string',
    required:true
  },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    team:{
      model: 'team',
  },
    reservations:{
      collection: 'reservation',
      via:'user',
  },
    usermatch:{
      collection: 'usermatch',
      via:'user'
  },
  

  },

};

