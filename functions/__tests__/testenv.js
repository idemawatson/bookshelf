import * as admin from "firebase-admin";
const test = require("firebase-functions-test")(
  {
    databaseURL: "https://fortesting-7eb95.firebaseio.com",
    projectId: "fortesting-7eb95",
    storageBucket: "fortesting-7eb95.appspot.com"
  },
  `${__dirname}/../keys/serviceAccountKey_test.json`
);
const firestore = admin.firestore();

export { firestore, test }