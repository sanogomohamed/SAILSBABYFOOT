var bcrypt = require("bcryptjs");
module.exports = {


  friendlyName: 'Create user',
  description: 'Créer un nouveau user',


  inputs: {
      email:{
        type:'string'
      },
      password:{
        type:'string'
      },
      name:{
        type:'string'
      },
      firstName:{
        type:'string'
      },

  },


  exits: {
    invalid:{
      responseType: "badRequest",
        description: "Email  and/or password not exist"
    },
    EmailAlreadyInuse:{
      statutCode: 409,
      description:"Email already in use"
    }

  },


  fn: async function (inputs, exits) {
    attr = {};
    attr.email = inputs.email.toLowerCase();
    attr.name = inputs.name;
    attr.firstName = inputs.firstName;
    if(inputs.password){
      attr.password = await bcrypt.hash(inputs.password,10)
      var user = await User.create(attr)
          .intercept('E_UNIQUE',()=> 'EmailAlreadyInuse')
          .intercept({name: 'UserError'},() => 'invalid')
          .fetch()
          return exits.success(user);

    }else{
      return exits.invalid("Missing");
    }
    

  }


};

