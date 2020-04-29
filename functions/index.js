const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();
exports.addUser = functions.https.onCall(async (data, context) => {
  await db.collection("user").add({
    name: data.name,
    id: data.uid
  });
  console.log(context);
});

exports.getBooks = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", e.message, e);
  }
  try {
    const bookRef = db.collection("book");
    const snapshot = await bookRef.where("user", "==", data.uid).get();
    let ret = [];
    snapshot.forEach(doc => {
      ret.push(doc.data());
    });
    return { body: ret };
  } catch (e) {
    console.error("getBooks: " + e);
    throw new functions.https.HttpsError("unknown", e.message, e);
  }
});
