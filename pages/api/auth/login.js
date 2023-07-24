import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { pretifyUserInfo, sign } from "@/utils/server-utils";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password should be atleast 5 characters")
    .max(30, "Password should be maximum 30 characters"),
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;
      const { email, password } = body;

      // For user-input validation
      await loginSchema.validate(body, { abortEarly: false });

      await dbConnect();
      const user = await UserModel.findOne({ email });

      // If user don't have an account
      if (!user) {
        res.status(404).json({ message: "Cannot find user with this email" });
        return;
      }

      // Comparing Password
      const comparePassword = await bcrypt.compare(password, user.password);

      // If Password is incorrect
      if (!comparePassword) {
        res.status(404).json({ message: "Incorrect password" });
        return;
      }

      // JWT-Token
      const payload = {
        userId: {
          id: user._id,
        },
      };
      // Signing JWT
      const iat = Math.floor(Date.now() / 1000);
      const exp = iat + 60 * 60 * 24 * 7; // one week
      const authToken = await sign(
        payload,
        process.env.JWT_PRIVATE_KEY,
        iat,
        exp
      );

      // Setting Cookie
      const cookie = serialize("token", authToken, {
        secure: true,
        expires: new Date(exp * 1000),
        path: "/",
      });
      res.setHeader("Set-Cookie", cookie);

      const userInfo = pretifyUserInfo(user);
      res
        .status(200)
        .json({ message: "Login Sucessfully", user: userInfo, authToken });
    } catch (error) {
      if (error.errors) {
        res.status(400).json({
          message: error.errors.join(" & "),
        });
        return;
      }
      console.log(error.errors);
      res
        .status(401)
        .json({ message: error.message || "Internal server error" });
    }
  }
  // For Invalid Method
  else {
    res.status(401).json({ message: "Not allowed!" });
  }
}
