import { SignJWT, jwtVerify } from "jose";

export function pretifyUserInfo(obj) {
  const user = JSON.parse(JSON.stringify(obj));
  delete user.password;
  delete user.__v;
  delete user.createdAt;
  // delete user.updatedAt;
  delete user.passwordHistory;
  return user;
}

export async function sign(payload, secret, iat, exp) {
  // const iat = Math.floor(Date.now() / 1000);
  // const exp = iat + 60 * 60 * 24 * 7; // one week

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token, secret) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  // console.log(payload);
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload;
}

export const isValidToken = async (token) => {
  try {
    const { userId } = await verify(
      token.replace('Bearer ', ''),
      process.env.JWT_PRIVATE_KEY
    );
    return userId;
  } catch (error) {
    return false;
  }
};
