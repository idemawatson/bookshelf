import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
const test = require("firebase-functions-test")(
  {
    databaseURL: "https://fortesting-7eb95.firebaseio.com",
    projectId: "fortesting-7eb95",
    storageBucket: "fortesting-7eb95.appspot.com"
  },
  `${__dirname}/../keys/serviceAccountKey_test.json`
);
import * as myFunctions from "../index";
import { deleteCollection } from "./util";
const firestore = admin.firestore();

const UID = "test-user";
const OTHER_UID = "test-user-other";

afterEach(async () => {
  await deleteCollection(firestore, "book", 100);
  await deleteCollection(firestore, "user", 100);
});

afterAll(() => {
  test.cleanup();
});

describe("addUser", () => {
  const wrapped = test.wrap(myFunctions.addUser);
  it("正常終了", async () => {
    const data = {
      name: "test-name",
      uid: UID
    };
    await wrapped(data, {});
    const snapshot = await firestore.collection("user").get();
    expect(snapshot.size).toEqual(1);
    const doc = snapshot.docs[0].data();
    expect(doc.name).toEqual(data.name);
    expect(doc.id).toEqual(data.uid);
  });
});

describe("getBooks", () => {
  const wrapped = test.wrap(myFunctions.getBooks);
  it("正常終了", async () => {
    await firestore.collection("user").add({
      name: "test-name",
      id: UID
    });
    let batch = firestore.batch();
    const bookRef = firestore.collection("book");
    batch.set(bookRef.doc("1"), {
      name: "test-book",
      user: UID
    });
    batch.set(bookRef.doc("2"), {
      name: "test-book-2",
      user: UID
    });
    batch.set(bookRef.doc("3"), {
      name: "test-book-3",
      user: OTHER_UID
    });
    await batch.commit();
    const res = await wrapped({ uid: UID }, { auth: "test-user" });
    expect(res.body.length).toEqual(2);
    expect(res.body[0].name).toEqual("test-book");
    expect(res.body[0].user).toEqual(UID);
    expect(res.body[1].name).toEqual("test-book-2");
    expect(res.body[1].user).toEqual(UID);
  });
  it("認証なし", async () => {
    const error = new functions.https.HttpsError("unauthenticated", "not authenticated");
    await expect(async () => {
      await wrapped({}, {});
    }).rejects.toEqual(error);
  });
});

describe("addBookToShelf", () => {
  beforeEach(async () => {
    await firestore.collection("user").add({
      name: "test-name",
      id: UID
    });
  });
  const book = {
    id: "book-id",
    title: "book-title",
    authors: "book-authors",
    url: "book-url",
    publishedDate: "book-publishedDate",
    pageCount: "book-pageCount",
    description: "book-description"
  };
  const data = {
    uid: UID,
    ...book
  };
  const wrapped = test.wrap(myFunctions.addBookToShelf);
  it("正常終了", async () => {
    await wrapped(data, { auth: UID });
    const res = await firestore.collection("book").get();
    expect(res.docs[0].data()).toEqual({ user: UID, ...book });
  });
  it("既にドキュメントが存在する場合エラー", async () => {
    await firestore.collection("book").add({ user: UID, ...book });
    const error = new functions.https.HttpsError("already-exists", "specified value is already exist.");
    await expect(async () => {
      await wrapped(data, { auth: UID });
    }).rejects.toEqual(error);
  });
  it("bookIDが空の場合エラー", async () => {
    await firestore.collection("book").add({ user: UID, ...book });
    const error = new functions.https.HttpsError("invalid-argument", "request format is invalid.");
    await expect(async () => {
      await wrapped({ id: "", uid: UID }, { auth: UID });
    }).rejects.toEqual(error);
  });
});

describe("updateBook", () => {
  const book = {
    id: "book-id",
    comment: "test-comment",
    completed: true
  };
  const wrapped = test.wrap(myFunctions.updateBook);
  it("正常終了", async () => {
    await firestore.collection("book").add({
      id: "book-id",
      user: UID
    });
    await wrapped(
      {
        uid: UID,
        ...book
      },
      { auth: UID }
    );
    const res = await firestore
      .collection("book")
      .where("user", "==", UID)
      .where("id", "==", "book-id")
      .get();
    expect(res.docs[0].data()).toEqual({ user: UID, ...book });
  });
  it("アップデート対象のドキュメントが存在しない場合エラー", async () => {
    const error = new functions.https.HttpsError("not-found", "document not found");
    await expect(async () => {
      await wrapped({ uid: UID, ...book }, { auth: UID });
    }).rejects.toEqual(error);
  });
});

describe("getUserInfo", () => {
  const wrapped = test.wrap(myFunctions.getUserInfo);
  it("正常終了", async () => {
    await firestore.collection("user").add({
      name: "test-name",
      id: UID
    });
    let batch = firestore.batch();
    const bookRef = firestore.collection("book");
    batch.set(bookRef.doc("1"), {
      pageCount: 100,
      completed: true,
      user: UID
    });
    batch.set(bookRef.doc("2"), {
      pageCount: 200,
      completed: true,
      user: UID
    });
    batch.set(bookRef.doc("3"), {
      pageCount: 300,
      completed: true,
      user: UID
    });
    await batch.commit();
    const res = await wrapped({ uid: UID }, { auth: UID });
    const data = res.body;
    expect(data.id).toEqual(UID);
    expect(data.progress).toEqual(36);
    expect(data.rest).toEqual(65);
    expect(data.level).toEqual(8);
    expect(data.pageCount).toEqual(600);
    expect(data.bookCount).toEqual(3);
    expect(data.beforeLevel).toEqual(0);
    const user = await firestore
      .collection("user")
      .where("id", "==", UID)
      .get();
    expect(user.docs[0].data().level).toEqual(data.level);
  });
  it("ドキュメントが重複の場合エラー", async () => {
    let batch = firestore.batch();
    const userRef = firestore.collection("user");
    batch.set(userRef.doc("1"), {
      id: UID
    });
    batch.set(userRef.doc("2"), {
      id: UID
    });
    await batch.commit();
    const error = new functions.https.HttpsError("data-loss", "invalid data found");
    await expect(async () => {
      await wrapped({ uid: UID }, { auth: UID });
    }).rejects.toEqual(error);
  });
  it("ドキュメントが存在しない場合エラー", async () => {
    const error = new functions.https.HttpsError("not-found", "document not found");
    await expect(async () => {
      await wrapped({ uid: UID }, { auth: UID });
    }).rejects.toEqual(error);
  });
});
