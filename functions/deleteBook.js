const db = require("./index").firestore;
const functions = require("firebase-functions");

module.exports = async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "not authenticated");
  if (!data.uid || !data.id ) throw new functions.https.HttpsError("invalid-argument", "request format is invalid.");
  try {
    const book = await db
      .collection("book")
      .where("user", "==", data.uid)
      .where("id", "==", data.id)
      .get();
    if (book.docs.length !== 1) throw new functions.https.HttpsError("not-found", "document not found.");
    await book.docs[0].ref.delete();
  } catch (e) {
    throw new functions.https.HttpsError(e.code || "unknown", e.message, e);
  }
};
