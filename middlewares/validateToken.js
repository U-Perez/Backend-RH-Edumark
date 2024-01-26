import fs from "fs";
import jwt from "jsonwebtoken";

export class ValidateToken {
  static validateJWT(request, response, next) {
    let public_key = null;
    const token = request.get("Authorization");
    if (process.env.MODE != "dev") {
      public_key = fs.readFileSync(process.env.PUBLIC_KEY, "utf8");
    } else {
      public_key = fs.readFileSync("./keys/public.pem", "utf8");
    }
    try {
      let decoded = jwt.verify(token, public_key);
      return response.status(200).json({ ok: true, decoded: decoded });
    } catch (e) {
      return response.status(403).json({
        ok: false,
        errors: [{ message: "existe el siguiente problema  ", e }],
      });
    }
    next();
  }
}
