var jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  var token;

  if ( req.headers && req.headers.authorization ) {
    var parts = req.headers.authorization.split(' ');
    if ( parts.length == 2 ) {
      var scheme = parts[0],
        credentials = parts[1];

      if ( /^Bearer$/i.test(scheme) ) {
        token = credentials;
      }
    } else {
      return res.json( 401, { err: { message: 'mauvais format du token= Bearer token' }});
    }
  } else {
    return res.json( 401, { err: { message: 'Token authorization non present' }});
  }

  jwt.verify(token, sails.config.jwt.jwtSecret, function(err, decoded) {
    if ( err ) return res.json(401,{ err: { message: 'Token authorization non present'  }});
    
    req.token = decodedToken.sub;
  });

  next();
}