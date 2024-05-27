import { collection, getDocs } from "firebase/firestore/lite";

const getUsers = async (db: any) => {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
};

export { getUsers };
