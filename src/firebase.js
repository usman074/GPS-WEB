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
        // language: 'en',
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  generateIntervalDocument();
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
    return true;
  } catch (error) {
    console.error("Error updating user document", error);
  }
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

export const generateTermsDocument = async () => {
  const termsRef = firestore.doc(`terms/123456789`);
  const snapshot = await termsRef.get();

  if (!snapshot.exists) {
    try {
      await termsRef.set({
        termsConditions: ''          
      });
    } catch (error) {
      console.error("Error creating terms document", error);
    }
  }
  return getTermsDocument("123456789");
};

export const getTermsDocument = async (id) => {
  try {
    const termsDocument = await firestore
      .doc(`terms/${id}`)
      .get();
    return {
      ...termsDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching terms", error);
  }
};

export const updateTermsDocument = async (terms) => {
  const termsRef = firestore.doc(`terms/123456789`);

  try {
    const termsData = await termsRef.update({
      termsConditions: terms,
    });
    return getTermsDocument('123456789');
  } catch (error) {
    console.error("Error updating terms document", error);
  }
};

export const generateIntervalDocument = async () => {
  const intervalRef = firestore.doc(`interval/123456789`);
  const snapshot = await intervalRef.get();

  if (!snapshot.exists) {
    try {

      await intervalRef.set({
          refreshInterval: {
            value: "5",
            type: "min"
          },
          gpsInterval: {
            value: "5",
            type: "min"
          }
      });
    } catch (error) {
      console.error("Error creating interval document", error);
    }
  }
  // return getIntervalDocument("123456789");
};

export const getIntervalDocument = async (uid) => {
  if (!uid) return null;
  try {
    const intervalDocument = await firestore.doc(`interval/${uid}`).get();
    return {
      ...intervalDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching interval", error);
  }
};

export const updateIntervalDocument = async (interval) => {
  if (!interval) return;

  const intervalRef = firestore.doc(`interval/123456789`);

  try {
    await intervalRef.update({
      ...interval,
    });
    return getIntervalDocument('123456789');
  } catch (error) {
    console.error("Error updating interval document", error);
  }
};

export const delUserVehicleDocument = async (uid) => {
  if (!uid) return;

  const userVehicleDocRef = firestore.doc(`vehicles/${uid}`);

  try {
    await userVehicleDocRef.delete();
    return true;
  } catch (error) {
    console.error("Error deleting user vehicle document", error);
  }
};
