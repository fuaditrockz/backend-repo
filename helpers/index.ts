import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../types";

export function isObjEmpty(obj: any | null) {
  if (obj !== null || null) {
    return Object.keys(obj ?? {}).length === 0;
  } else {
    return true;
  }
}

export function generateAccessToken(data: User, secretKey: string) {
  return jwt.sign({ email: data.email }, secretKey, {
    expiresIn: "365d",
  });
}

export function getTokenExpirationTime(token: string) {
  const decoded: any = jwt.decode(token);
  return decoded.exp;
}

export function getTokenEmail(token: string) {
  const decoded: any = jwt.decode(token);
  return decoded.email;
}

export function hashingPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function checkPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
