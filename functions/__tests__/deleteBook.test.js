import * as functions from "firebase-functions";
import * as myFunctions from "../index";
import { firestore, test } from "./testenv";
import { deleteCollection } from "./util";
const UID = "test-user";
const OTHER_UID = "other-user";
const book1 = "book1";
const book2 = "book2";
const book3 = "book3";

afterEach(async () => {
  await deleteCollection(firestore, "book", 100);
  await deleteCollection(firestore, "user", 100);
});

afterAll(() => {
  test.cleanup();
});

describe("deleteBook", () => {
  const wrapped = test.wrap(myFunctions.deleteBook);
  it("正常終了", async () => {
    await firestore.collection("user").add({
      name: "test-name",
      id: UID
    });
    let batch = firestore.batch();
    const bookRef = firestore.collection("book");
    batch.set(bookRef.doc("1"), {
      name: "test-book",
      id: book1,
      user: UID
    });
    batch.set(bookRef.doc("2"), {
      name: "test-book-2",
      id: book2,
      user: UID
    });
    batch.set(bookRef.doc("3"), {
      name: "test-book-3",
      id: book3,
      user: OTHER_UID
    });
    await batch.commit();
    await wrapped({ uid: UID, id: book1 }, { auth: "test-user" });
    const res = await firestore
      .collection("book")
      .where("user", "==", UID)
      .get();
    expect(res.docs.length).toEqual(1);
    const data = res.docs[0].data();
    expect(data.name).toEqual("test-book-2");
    expect(data.user).toEqual(UID);
    expect(data.id).toEqual(book2);
  });
  it("引数が不正の場合エラー", async () => {
    const error = new functions.https.HttpsError("invalid-argument", "request format is invalid.");
    await expect(async () => {
      await wrapped({ uid: UID }, { auth: UID });
    }).rejects.toEqual(error);
    await expect(async () => {
      await wrapped({ id: book1 }, { auth: UID });
    }).rejects.toEqual(error);
  });
  it("ドキュメントが存在しない場合エラー", async () => {
    const error = new functions.https.HttpsError("not-found", "document not found.");
    await expect(async () => {
      await wrapped({ uid: UID, id: book1 }, { auth: UID });
    }).rejects.toEqual(error);
  });
});
