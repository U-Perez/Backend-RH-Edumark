// import jwt from "jsonwebtoken";
// import fs from "fs";

// export class Payload {
//   createToken(data) {
//     let private_key = null;
//     if (process.env.MODE != "dev") {
//       private_key = fs.readFileSync(process.env.PRIVATE_KEY, "utf8");
//     } else {
//       private_key = fs.readFileSync("./keys/private.pem", "utf8");
//     }
//     const id = data.id;
//     const correo = data.correo;
//     return jwt.sign(
//       {
//         id: id,
//         correo: correo,
//       },
//       private_key,
//       { algorithm: "RS256", expiresIn: "1h" }
//     );
//   }
// }

import jwt from 'jsonwebtoken';
import fs from 'fs';

export class Payload {
  createToken(data) {
    let private_key = null;

    if (process.env.MODE !== 'dev') {
      private_key = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
    } else {
      private_key = fs.readFileSync('./keys/private.pem', 'utf8');
    }

    const user_id = data.id;
    const correo = data.correo;
    const role = 1;

    return jwt.sign(
      {
        user_id: user_id,
        correo: correo,
        role: role,
      },
      private_key,
      { algorithm: 'RS256', expiresIn: '9h' }
    );
  }
}