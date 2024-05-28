import { collection, getDocs } from "firebase/firestore/lite";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { User } from "../../types";
import { isObjEmpty } from "../../helpers";

const getUsers = async (db: any) => {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
};

const createUser = async (auth: any, data: User) => {
  let result: any = {};
  await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential: any) => {
      // Signed up
      result = userCredential.user;
    })
    .catch((error: any) => {
      result = error;
    });

  if (isObjEmpty(result) || result.code === "auth/email-already-in-use") {
    return {
      error: true,
      code: 403,
      message: "Email already in use",
      data: result,
    };
  } else {
    await updateProfile(auth.currentUser, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    }).catch((err) => {
      throw new Error(err.message);
    });

    await sendEmailVerification(auth.currentUser).catch((err) => {
      throw new Error(err.message);
    });

    // Send data to Firestore (For technical test purpose)

    return {
      error: false,
      code: 201,
      message: "User created successfully",
      data: result,
    };
  }
};

const updateUser = async (auth: any, data: User) => {
  const result = await updateProfile(auth.currentUser, {
    displayName: data.displayName,
    photoURL: data.photoURL,
  })
    .then((data: any) => {
      return {
        error: false,
        code: 201,
        message: "User created successfully",
        data,
      };
    })
    .catch((err: any) => {
      return {
        error: true,
        code: 403,
        message: "You doesn't have access to update this user",
        data: err,
      };
    });

  return result;
};

const login = async (auth: any, data: User) => {
  const result = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  )
    .then((userCredential: any) => {
      // Signed in
      const user = userCredential.user;
      return {
        error: false,
        code: 200,
        message: "User logged in successfully",
        data: user,
      };
    })
    .catch((err: any) => {
      console.log("Error ->", err);
      return {
        error: true,
        code: 403,
        message: "You doesn't have access to update this user",
        data: err,
      };
    });

  return result;
};

export { getUsers, createUser, login };
