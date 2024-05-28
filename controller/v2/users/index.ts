import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore/lite";
import { db } from "../../../config";
import { User } from "../../../types";
import {
  generateAccessToken,
  isObjEmpty,
  hashingPassword,
  getTokenExpirationTime,
  checkPassword,
} from "../../../helpers";

const getUsers = async () => {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
};

const createUser = async (data: User) => {
  let isUserExist = false;

  // Firestore query (Check existing user)
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc: any) => {
    if (doc.data().email === data.email) {
      isUserExist = true;
    }
  });

  // Logic for response
  if (!isUserExist) {
    const token = generateAccessToken(data, process.env.APIKEY ?? "");
    const hashedPassword = await hashingPassword(data.password);

    const docRef = await addDoc(collection(db, "users"), {
      full_name: data.displayName,
      email: data.email,
      password: hashedPassword,
      photo_url: data.photoURL,
      tokenManager: {
        access_token: token,
        expiration_time: getTokenExpirationTime(token),
      },
      email_verified: false,
      created_at: new Date(),
      last_login: new Date(),
    });

    if (!isObjEmpty(docRef)) {
      return {
        error: false,
        code: 201,
        message: "User created successfully",
        data: {
          access_token: token,
        },
      };
    } else {
      return {
        error: true,
        code: 500,
        message: "Internal server error occurred",
      };
    }
  } else {
    return {
      error: true,
      code: 403,
      message: "Email already in use",
    };
  }
};

export const login = async (data: User) => {
  let isUserExist = false;
  let isPasswordMatch = false;
  let user: any = {};
  let id: string = "";

  // Firestore query (Check existing user)
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc: any) => {
    if (doc.data().email === data.email) {
      id = doc.id;
      isUserExist = true;
      user = doc.data();
    }
  });

  // Logic for response
  if (isUserExist) {
    const token = generateAccessToken(data, process.env.APIKEY ?? "");
    isPasswordMatch = await checkPassword(data.password, user.password);

    if (isPasswordMatch) {
      let updatedData: any = {};
      await updateDoc(doc(db, "users", id), {
        tokenManager: {
          access_token: token,
          expiration_time: getTokenExpirationTime(token),
        },
        last_login: new Date(),
      });

      querySnapshot.forEach((doc: any) => {
        if (doc.data().email === data.email) {
          updatedData = doc.data();
        }
      });

      return {
        error: false,
        code: 200,
        message: "Login success",
        data: updatedData,
      };
    } else {
      return {
        error: true,
        code: 401,
        message: "Invalid password",
      };
    }
  } else {
    return {
      error: true,
      code: 404,
      message: "User not found",
    };
  }
};

export { getUsers, createUser };
