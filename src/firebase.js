import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD1XRyq0hmpcPe6bQFe4bk80YkaS1epPto",
  authDomain: "gps-web-cf921.firebaseapp.com",
  databaseURL: "https://gps-web-cf921-default-rtdb.firebaseio.com",
  projectId: "gps-web-cf921",
  storageBucket: "gps-web-cf921.appspot.com",
  messagingSenderId: "358885136837",
  appId: "1:358885136837:web:12b4846c51851bd3b713ac",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore(app);

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const updateUserDocument = async (user) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  delete user.uid;
  try {
    const userData = await userRef.update({
      ...user,
    });
    console.log(userData);
    return true;
  } catch (error) {
    console.error("Error updating user document", error);
  }
  // return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getUsersList = async () => {
  try {
    const usersListApiCall = await firestore
      .collection(`users`)
      .where("isAdmin", "==", false)
      .get();

    let usersList = [];
    usersListApiCall.forEach((user) => {
      usersList = [...usersList, { ...user.data(), uid: user.id }];
    });
    return usersList;
  } catch (error) {
    console.error("Error fetching users list", error);
  }
};

export const delUserDocument = async (uid) => {
  if (!uid) return;

  try {
    const docDel = await firebase.auth.uid; //firestore.document(firestore.getInstance.uid).delete();
    console.log(docDel);
    // retÎurn true;
  } catch (error) {
    console.error("Error deleting user document", error);
  }
  // return getUserDocument(user.uid);
};

export const getTermsDocument = async () => {
  try {
    const termsDocument = await firestore
      .doc(`terms/GUeiriZTkVt5BFbOJE9p`)
      .get();
    return {
      ...termsDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching terms", error);
  }
};

export const updateTermsDocument = async (terms) => {
  const termsRef = firestore.doc(`terms/GUeiriZTkVt5BFbOJE9p`);

  try {
    const termsData = await termsRef.update({
      termsConditions: terms,
    });
    console.log(termsData);
    return true;
  } catch (error) {
    console.error("Error updating terms document", error);
  }
};
