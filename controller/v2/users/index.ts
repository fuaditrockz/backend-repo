import {
  collection,
  getDocs,
  getDoc,
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
  ApiError,
} from "../../../helpers";

const apiError = new ApiError();

const getUser = async (email: string) => {
  const user = await getDoc(doc(db, "users", email));
  if (!isObjEmpty(user.data()) && user.data()) {
    return {
      error: false,
      code: 200,
      data: user.data(),
    };
  } else {
    return apiError.error(404);
  }
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
    let docRef: any = {};
    const token = generateAccessToken(data, process.env.APIKEY as string);
    const hashedPassword = await hashingPassword(data.password);

    await setDoc(doc(db, "users", data.email), {
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

    docRef = await getDoc(doc(db, "users", data.email));

    if (!isObjEmpty(docRef)) {
      return {
        error: false,
        code: 201,
        message: "User created successfully",
        data: {
          ...docRef.data(),
        },
      };
    } else {
      return apiError.error(500);
    }
  } else {
    return apiError.error(403, "Email already in use");
  }
};

export const login = async (data: User) => {
  let isUserExist = false;
  let isPasswordMatch = false;
  let user: any = {};

  // Firestore query (Check existing user)
  user = await getDoc(doc(db, "users", data.email));
  isUserExist = !isObjEmpty(user.data());

  // Logic for response
  if (isUserExist) {
    const token = generateAccessToken(data, process.env.APIKEY as string);
    isPasswordMatch = await checkPassword(data.password, user.data().password);

    if (isPasswordMatch) {
      await updateDoc(doc(db, "users", data.email), {
        tokenManager: {
          access_token: token,
          expiration_time: getTokenExpirationTime(token),
        },
        last_login: new Date(),
      });

      const updatedData = await getDoc(doc(db, "users", data.email));

      return {
        error: false,
        code: 200,
        message: "Login success",
        data: updatedData.data(),
      };
    } else {
      return apiError.error(401, "Password is incorrect");
    }
  } else {
    return apiError.error(404);
  }
};

const updateUser = async (email: string, updatedData: any) => {
  let isUserExist = false;
  let user: any = {};

  // Firestore query (Check existing user)
  user = await getDoc(doc(db, "users", email));
  isUserExist = !isObjEmpty(user.data()) && user.data();

  if (isUserExist) {
    await updateDoc(doc(db, "users", email), {
      ...updatedData,
      email: email,
    });

    return {
      error: false,
      code: 200,
      message: "User updated successfully",
    };
  } else {
    return apiError.error(404);
  }
};

export { getUser, createUser, updateUser };
