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

export class ApiError {
  public error(code: number, customMessage?: string) {
    let message = "";

    if (!customMessage) {
      switch (code) {
        case 400:
          message = "Bad Request";
          break;
        case 401:
          message = "Unauthorized";
          break;
        case 403:
          message = "Forbidden";
          break;
        case 404:
          message = "Resource not found";
          break;
        case 500:
          message = "Internal Server Error";
          break;
        default:
          message = "Error";
          break;
      }
    } else {
      message = customMessage as string;
    }

    return {
      error: true,
      code,
      message,
    };
  }
}
