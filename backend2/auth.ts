// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { JWT_SECRET } from '../config';
// import UnauthorizedError from '../errors/unauthorized-error';

// interface JwtPayload {
//   _id: string
// }

// const auth = (req: Request, res: Response, next: NextFunction) => {
//   console.log('auth start');
//   let token = req.cookies.jwt;
//   let payload: JwtPayload | null = null;
//   let authHeader =req.header("Authorization");
  
//   if(!token)
//     token = authHeader && authHeader.split(' ')[1];

//   token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPLUgxdklkcWFXLVUyRm5lU1pERm9iTVVfMGlyTElRWVZGazNwMnhWT3hRIn0.eyJleHAiOjE3NDAwNjA0NjEsImlhdCI6MTc0MDA2MDE2MSwiYXV0aF90aW1lIjoxNzQwMDYwMTYwLCJqdGkiOiJmNDE0NmUzNC03MTc3LTRmODItYTNlMC1jMDcwNzBjN2FkNzkiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL3JlcG9ydHMtcmVhbG0iLCJzdWIiOiJlZmNkNmMwNS0zNmU4LTQ0YzEtYmMzMy0wYzk3ZTE0MmM1MTEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZXBvcnRzLWZyb250ZW5kIiwibm9uY2UiOiI1NGI1MDRiMS1hYzBlLTQ0ZWQtOGU4ZS1jMzMzODg1MWVlNTEiLCJzZXNzaW9uX3N0YXRlIjoiOTU1MjgwODctZjQ3ZC00MWFlLThkZTktOTUyYzMxZTA1Y2E3IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInVzZXIiXX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI5NTUyODA4Ny1mNDdkLTQxYWUtOGRlOS05NTJjMzFlMDVjYTciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJVc2VyIE9uZSIsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIxIiwiZ2l2ZW5fbmFtZSI6IlVzZXIiLCJmYW1pbHlfbmFtZSI6Ik9uZSIsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20ifQ.1j4hLIYQ9DdwwZByzHuXXGLN_8yspe-8hL43NrnJ9uP4lbeuo3OBo7CPXFzH6ot90VF2jTfGcx4lVGGk3hTvxQ0ai6OCInIcqAqdyPoqqj7B5dxTDTPFurVLMe_wkQM2xlWu3lSofmBjaKw0MTyfbdSvOt-FO2ZjazrsqGIJdvKXdg-5cXYfMjjwiqFIu6SpXyRAwcho2B2fubJkZkOTy57jsLCdoxO__v0BHn8xIRaiDMRyJlUtl5FwdsFUtRG1U0K-1ymMlL-SBDEzaFH6K6DNdq84N0HUlS8o-xL943JsNt-80Sd08fp1Fre3mA1b-r9r5KVad453QBCGBRphzQ";
//   console.log('auth token:',token);
//   console.log('auth payload:',payload);
  

//   try {
//     //var jwt_secret = "{   'e: 'AQAB',  'kty': 'RSA',  'n': '1lfmExUInr8N7EwE2pFy0SXUtxQXVl5igP_0RedJBugOSlJt30lhfO9uu9Ey7XMkRTsdVFyHzyK3t02vzxkkFF_JPkj27QfP2bgdzUYbKn5EiF_fbIjZRHO7ohYLiywvbIKnnAUNKeGTvZKYlzEv0DEkUHeb_GDilsWEbiQanCGbH8YnG8uJyL2teQOjVeT3kNfR0jXZkDFHEIMdjjzUGmKGDBYrfPqKXsHSkxN4O_59EbFIUpTHfJo9gx0L3lNQ7aXPVMHpPJFNpWx488o8j3DqOK5Jz-o6793wHJvBwfBwBSXLbPtmQWI-PdbbbwcyaAbFMroBfpvjKGptfKzRBw'}";
//     var jwt_secret =
//     `-----BEGIN PUBLIC KEY-----
//     MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6S7asUuzq5Q/3U9rbs+PkDVIdjgmtgWreG5qWPsC9xXZKiMV1AiV9LXyqQsAYpCqEDM3XbfmZqGb48yLhb/XqZaKgSYaC/h2DjM7lgrIQAp9902Rr8fUmLN2ivr5tnLxUUOnMOc2SQtr9dgzTONYW5Zu3PwyvAWk5D6ueIUhLtYzpcB+etoNdL3Ir2746KIy/VUsDwAM7dhrqSK8U2xFCGlau4ikOTtvzDownAMHMrfE7q1B6WZQDAQlBmxRQsyKln5DIsKv6xauNsHRgBAKctUxZG8M4QJIx3S6Aughd3RZC4Ca5Ae9fd8L8mlNYBCrQhOZ7dS0f4at4arlLcajtwIDAQAB
//     -----END PUBLIC KEY-----`;    //console.log(Buffer.from(jwt_secret).toString('base64'));
//     //console.log(Buffer.from(jwt_secret, 'base64').toString('ascii'));

// //jwt_secret = Buffer.from(jwt_secret).toString('base64');
// //jwt_secret =  jwt_secret.replace(/\\n/g,'\n').trim();
//     payload = null;
//     jwt.verify(token,  jwt_secret, { algorithms: ['RS256'],ignoreExpiration:true }, (err, decoded) => {
//       if (err) {
//         console.error("Token validation failed:",decoded, err,);
//         next(new UnauthorizedError('be_auth Необходима авторизация' + err));
//         return;
//       }
//       console.log("Token is valid:", decoded);
//   });
//     console.log('payload', payload);
//    // req.user = payload;//  as JwtPayload;
    
//     next();
//   } catch (e) {
//     next(new UnauthorizedError('be_auth Необходима авторизация' + req.originalUrl));
//     console.log('be_auth req Необходима авторизация', req.originalUrl, e);
//   }
// };

// export default auth;
