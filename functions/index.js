const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();
//onCallの調査
exports.getBooks = functions.https.onCall(async (data, context) => {
  const bookRef = db.collection("book");
  try {
    const snapshot = await bookRef.get();
    let ret = [];
    snapshot.forEach(doc => {
      ret.push(doc.data().name);
    });
    return { body: ret };
  } catch (e) {
    throw new functions.https.HttpsError("unknown", e.message, e);
  }
});
