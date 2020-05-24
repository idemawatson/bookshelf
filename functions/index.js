const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp(functions.config().firebase);

let db = admin.firestore();
exports.firestore = db;
const deleteBook = require("./deleteBook");

exports.addUser = functions.https.onCall(async (data, context) => {
  await db.collection("user").add({
    name: data.name,
    id: data.uid
  });
});

exports.getBooks = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "not authenticated");
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
    throw new functions.https.HttpsError("unknown", e.message, e);
  }
});

exports.getFriendBooks = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "not authenticated");
  }
  if (!data.uid || !data.friendId || data.uid === data.friendId) {
    throw new functions.https.HttpsError("invalid-argument", "request format is invalid.");
  }
  try {
    const currentUserSnapshot = await db
      .collection("user")
      .where("id", "==", data.uid)
      .get();
    const friends = currentUserSnapshot.docs[0].data().friend;
    if (!friends.includes(data.friendId)) {
      throw new functions.https.HttpsError("permission-denied", "have no access rights.");
    }
    const friendBookSnapshot = await db
      .collection("book")
      .where("user", "==", data.friendId)
      .get();
    let ret = [];
    friendBookSnapshot.forEach(doc => {
      ret.push(doc.data());
    });
    return ret;
  } catch (e) {
    throw new functions.https.HttpsError("unknown", e.message, e);
  }
});

exports.addBookToShelf = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "not authenticated");
  }
  if (!data || !data.id) {
    throw new functions.https.HttpsError("invalid-argument", "request format is invalid.");
  }
  try {
    const bookRef = db.collection("book");
    const snapshot = await bookRef
      .where("user", "==", data.uid)
      .where("id", "==", data.id)
      .get();
    if (!snapshot.empty) {
      throw new functions.https.HttpsError("already-exists", "specified value is already exist.");
    }
    await bookRef.add({
      id: data.id,
      user: data.uid,
      title: data.title,
      authors: data.authors,
      url: data.url,
      publishedDate: data.publishedDate,
      pageCount: data.pageCount,
      description: data.description
    });
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
    }
    await snapshot.docs[0].ref.update({ comment: data.comment, completed: data.completed });
  } catch (e) {
    throw new functions.https.HttpsError(e.code || "unknown", e.message, e);
  }
});

exports.getUserInfo = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "not authenticated");
  }
  try {
    const userRef = db.collection("user");
    const userSnapshot = await userRef.where("id", "==", data.uid).get();
    if (userSnapshot.empty) {
      throw new functions.https.HttpsError("not-found", "document not found");
    }
    if (userSnapshot.size > 1) {
      throw new functions.https.HttpsError("data-loss", "invalid data found");
    }
    const bookRef = db.collection("book");
    const bookSnapshot = await bookRef
      .where("user", "==", data.uid)
      .where("completed", "==", true)
      .get();
    let exp = 0;
    bookSnapshot.forEach(doc => {
      exp += doc.data().pageCount;
    });
    const calc = calcurateLevel(exp);
    const doc = userSnapshot.docs[0].data();
    const ret = {
      ...doc,
      ...calc,
      pageCount: exp,
      bookCount: bookSnapshot.size,
      beforeLevel: doc.level || 0
    };
    await userSnapshot.docs[0].ref.update({ level: calc.level });
    return { body: ret };
  } catch (e) {
    throw new functions.https.HttpsError(e.code || "unknown", e.message, e);
  }
});

exports.addFriend = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "not authenticated");
  }
  if (!data.uid || !data.friend || data.uid === data.friend) {
    throw new functions.https.HttpsError("invalid-argument", "request format is invalid.");
  }
  try {
    const userRef = db.collection("user");
    const user = await userRef.where("id", "==", data.uid).get();
    const friend = await userRef.where("id", "==", data.friend).get();
    if (user.size !== 1 || friend.size !== 1) {
      throw new functions.https.HttpsError("not-found", "document not found");
    }
    let currentFriends = user.docs[0].data().friend || [];
    if (currentFriends.length > 0 && currentFriends.includes(data.friend))
      throw new functions.https.HttpsError("already-exists", "user already exists in friends.");
    currentFriends.push(friend.docs[0].data().id);
    await user.docs[0].ref.update({ friend: currentFriends });
  } catch (e) {
    throw new functions.https.HttpsError(e.code || "unknown", e.message, e);
  }
});

exports.searchUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "not authenticated");
  }
  if (!data.uid || !data.searchId || data.uid === data.searchId) {
    throw new functions.https.HttpsError("invalid-argument", "request format is invalid.");
  }
  try {
    const userRef = db.collection("user");
    const result = await userRef.where("id", "==", data.searchId).get();
    if (result.empty) return null;
    const currentUser = await userRef.where("id", "==", data.uid).get();
    const friends = currentUser.docs[0].data().friend;
    if (friends && friends.includes(result.docs[0].data().id))
      throw new functions.https.HttpsError("already-exists", "user already exists in friends.");
    return { ...result.docs[0].data() };
  } catch (e) {
    throw new functions.https.HttpsError(e.code || "unknown", e.message, e);
  }
});

exports.getFriends = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "not authenticated");
  }
  try {
    if (!data.uid) throw new functions.https.HttpsError("invalid-argument", "request format is invalid.");
    const user = await db
      .collection("user")
      .where("id", "==", data.uid)
      .get();
    if (user.size !== 1) throw new functions.https.HttpsError("not-found", "document not found");
    const friends = user.docs[0].data().friend;
    let res = [];
    if (!friends) return res;
    const docs = await db
      .collection("user")
      .where("id", "in", friends)
      .get();
    docs.forEach(doc => {
      res.push(doc.data());
    });
    return res;
  } catch (e) {
    throw new functions.https.HttpsError(e.code || "unknown", e.message, e);
  }
});

exports.deleteBook = functions.https.onCall(async (data, context) => deleteBook(data, context));

const calcurateLevel = exp => {
  let standard = 50;
  let level = 0;
  let progress = 0;
  const condition = true;
  while (condition) {
    progress = exp;
    exp -= standard;
    if (exp >= 0) {
      level += 1;
    } else {
      break;
    }
    standard = Math.floor(standard * 1.1);
  }
  return {
    progress: Math.floor((progress / standard) * 100),
    rest: standard - progress,
    level: level
  };
};
