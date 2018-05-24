/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
        var bcrypt = require("bcryptjs");
        var jwt = require('jsonwebtoken');

module.exports = {

    login: async function(req,res){
        console.log(req.body)
        var user = await User.findOne({
            email: req.body.email
        })
        console.log(user);
        if(!user) return res.notFound();
           let isIdentical = await bcrypt.compare(req.body.password , user.password);
           console.log(isIdentical);
           if(!isIdentical){
            return res.notFound(); 
         } 

         

         let returnUser = {
            email: user.email,
            name: user.name,
            firstName: user.firstName
          }

          let token = jwt.sign({
            id:user.id,
            email:user.email,
            name:user.name,
            firstName:user.firstName
            
        },sails.config.jwt.jwtSecret,{expiresIn: sails.config.jwt.jwtExpiresIn});
        return res.ok({
            token:token,
            user:{
                email:user.email,
                firstName:user.firstName,
                name:user.name,
            }
        })
        },
    ///logout: function(req, res){},
    
    register: async function(req, res){
        if(_.isUndefined(req.param("email"))){
            return res.badRequest('il est ou mon mail')
        }
        if(_.isUndefined(req.param("password"))){
            return res.badRequest('il est ou mon password')
        }
        if(req.param("password").length<10){
            return res.badRequest("C'est quoi ce mot ce password")
        }

        var user = await sails.helpers.createUser.with({
            email: req.body.email,
            password: req.body.password,
            name:  req.body.name,
            firstName: req.body.firstName
        })
        let returnUser = {
            email: user.email,
            name: user.name,
            firstName: user.firstName
          }
        var token = jwt.sign({user:user.id},sails.config.jwt.jwtSecret,{expiresIn: sails.config.jwt.jwtExpiresIn});
        return res.ok({
            token: token,
            user:returnUser})

        
    }
  

};

