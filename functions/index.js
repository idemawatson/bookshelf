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

exports.addBookToShelf = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "not authenticated");
  }
  if (!data || !data.id) {
    throw new functions.https.HttpsError("invalid-argument");
  }
  try {
    const bookRef = db.collection("book");
    const snapshot = await bookRef
      .where("user", "==", data.uid)
      .where("id", "==", data.id)
      .get();
    if (!snapshot.empty) {
      throw new functions.https.HttpsError("already-exists", "specified value is already exist.");
    } else {
      bookRef.add({
        id: data.id,
        user: data.uid,
        title: data.title,
        authors: data.authors,
        url: data.url,
        publishedDate: data.publishedDate,
        pageCount: data.pageCount,
        description: data.description
      });
    }
  } catch (e) {
    throw new functions.https.HttpsError(e.code || "unknown", e.message, e);
  }
});

exports.updateBook = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "not authenticated");
  }
  try {
    const bookRef = db.collection("book");
    const snapshot = await bookRef
      .where("user", "==", data.uid)
      .where("id", "==", data.id)
      .get();
    if (snapshot.empty) {
      throw new functions.https.HttpsError("not-found", "document not found");
    } else {
      snapshot.forEach(async doc => {
        await doc.ref.update({ comment: data.comment, completed: data.completed });
      });
    }
  } catch (e) {
    throw new functions.https.HttpsError(e.code || "unknown", e.message, e);
  }
});
