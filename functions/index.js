const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();
//onCallの調査
exports.getBooks = functions.https.onCall(async (req, res) => {
  const bookRef = db.collection("book");
  try {
    const snapshot = await bookRef.get();
    let ret = [];
    snapshot.forEach(doc => {
      ret.push(doc.data().name());
    });
    res.send({ body: ret });
  } catch (e) {
    console.log("Error getting documents", e);
    res.status(400).send(e);
  }
});
