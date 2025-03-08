const express = require('express')
const JWT = require('jsonwebtoken');

const app = express();

const server = app.listen(8090, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});
app.get('/api/reports',  function (req, res) {
 console.log('auth start');
  let token = "";
  let authHeader =req.header("Authorization");
  if(!token)
    token = authHeader && authHeader.split(' ')[1];
  console.log('auth token:',token);
  try {
    var jwt_secret = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1lfmExUInr8N7EwE2pFy0SXUtxQXVl5igP/0RedJBugOSlJt30lhfO9uu9Ey7XMkRTsdVFyHzyK3t02vzxkkFF/JPkj27QfP2bgdzUYbKn5EiF/fbIjZRHO7ohYLiywvbIKnnAUNKeGTvZKYlzEv0DEkUHeb/GDilsWEbiQanCGbH8YnG8uJyL2teQOjVeT3kNfR0jXZkDFHEIMdjjzUGmKGDBYrfPqKXsHSkxN4O/59EbFIUpTHfJo9gx0L3lNQ7aXPVMHpPJFNpWx488o8j3DqOK5Jz+o6793wHJvBwfBwBSXLbPtmQWI+PdbbbwcyaAbFMroBfpvjKGptfKzRBwIDAQAB\n-----END PUBLIC KEY-----`;    //console.log(Buffer.from(jwt_secret).toString('base64'));`-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1lfmExUInr8N7EwE2pFy0SXUtxQXVl5igP/0RedJBugOSlJt30lhfO9uu9Ey7XMkRTsdVFyHzyK3t02vzxkkFF/JPkj27QfP2bgdzUYbKn5EiF/fbIjZRHO7ohYLiywvbIKnnAUNKeGTvZKYlzEv0DEkUHeb/GDilsWEbiQanCGbH8YnG8uJyL2teQOjVeT3kNfR0jXZkDFHEIMdjjzUGmKGDBYrfPqKXsHSkxN4O/59EbFIUpTHfJo9gx0L3lNQ7aXPVMHpPJFNpWx488o8j3DqOK5Jz+o6793wHJvBwfBwBSXLbPtmQWI+PdbbbwcyaAbFMroBfpvjKGptfKzRBwIDAQAB\n-----END PUBLIC KEY-----`;    //console.log(Buffer.from(jwt_secret).toString('base64'));
    let payload = null;
    JWT.verify(token,  jwt_secret, { algorithms: ['RS256'],ignoreExpiration:true }, (err, decoded) => {
      if (err) {
        console.error("Token validation failed:",decoded, err,);
        res.status(401).json({ error: err});
        return;
      }
      console.log("Token is valid:", decoded);
      payload = decoded;
  });
  if(payload.realm_access.roles.includes('prothetic_user'))
    res.status(200).json({ report: "somere report"});
  else
  res.status(401).json({ error: "нужна роль prothetic_user"});
  } catch (e) {
    console.log('be_auth req Необходима авторизация', req.originalUrl, e);
    res.status(500).json({ error: "ошибка сервера"});
  }
  return;
});
