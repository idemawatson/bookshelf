// process.env.FIRESTORE_EMULATOR_HOST = "localhost:58080";

import { readFileSync } from "fs";
import { initializeTestApp, loadFirestoreRules, apps, assertSucceeds, assertFails, clearFirestoreData } from "@firebase/testing";

const getFirestoreWithAuth = () => {
  const app = initializeTestApp({
    projectId: "my-test-project",
    auth: { uid: "test-user", email: "test-user@example.com" }
  });

  return app.firestore();
};

const getAnotherFirestoreWithAuth = () => {
  const app = initializeTestApp({
    projectId: "my-test-project-2",
    auth: { uid: "test-user-2", email: "test-user2@example.com" }
  });

  return app.firestore();
};

const getFirestore = () => {
  const app = initializeTestApp({
    projectId: "my-test-project",
    auth: null
  });
  return app.firestore();
};

beforeEach(async () => {
  // セキュリティルールの読み込み
  await loadFirestoreRules({
    projectId: "my-test-project",
    rules: readFileSync("firestore.rules", "utf8")
  });
  await loadFirestoreRules({
    projectId: "my-test-project-2",
    rules: readFileSync("firestore.rules", "utf8")
  });
});

afterEach(async () => {
  // 使用したアプリの削除
  await clearFirestoreData({ projectId: "my-test-project" });
  await clearFirestoreData({ projectId: "my-test-project-2" });
  await Promise.all(apps().map(app => app.delete()));
});

describe("userコレクション", () => {
  it("create", async () => {
    const db = getFirestoreWithAuth();
    await assertSucceeds(
      db.collection("user").add({
        name: "test-name"
      })
    );
  });
  it("create_認証なし", async () => {
    const db = getFirestore();
    await assertFails(
      db.collection("user").add({
        name: "test-name"
      })
    );
  });
  it("read", async () => {
    const db = getFirestoreWithAuth();
    await db.collection("user").add({
      name: "test-name"
    });
    await assertSucceeds(db.collection("user").get());
  });
  it("update", async () => {
    const db = getFirestoreWithAuth();
    const authedUser = { name: "test-name", uid: "test-user" };
    const unauthedUser = { name: "test-name", uid: "not-test-user" };
    await db.collection("user").doc("new-user-id").set(authedUser);
    await db.collection("user").doc("not-user-id").set(unauthedUser);
    await assertSucceeds(db.collection("user").doc("new-user-id").update({test: "update"}));
    await assertFails(db.collection("user").doc("not-user-id").update({test: "update"}));
  });
  it("delete", async () => {
    const db = getFirestoreWithAuth();
    const authedUser = { name: "test-name", uid: "test-user" };
    const unauthedUser = { name: "test-name", uid: "not-test-user" };
    await db.collection("user").doc("new-user-id").set(authedUser);
    await db.collection("user").doc("not-user-id").set(unauthedUser);
    await assertSucceeds(db.collection("user").doc("new-user-id").delete());
    await assertFails(db.collection("user").doc("not-user-id").delete());
  });
});

describe("bookコレクション", () => {
  it("create", async () => {
    const db = getFirestoreWithAuth();
    await assertSucceeds(
      db.collection("book").add({
        name: "test-name",
        uid: "test-user"
      })
    );
    await assertFails(
      db.collection("book").add({
        name: "test-name",
        uid: "not-test-user"
      })
    );
  });
  it("read", async () => {
    const db = getFirestoreWithAuth();
    const db2 = getAnotherFirestoreWithAuth();
    await db.collection("book").doc("user-id").set({
      name: "test-name",
      uid: "test-user"
    });
    await db2.collection("book").doc("user-id-2").set({
      name: "test-name-2",
      uid: "test-user-2"
    });
    await assertSucceeds(db.collection("user").doc("user-id").get());
    await assertSucceeds(db.collection("user").doc("user-id-2").get());
  });
  it("update", async () => {
    const db = getFirestoreWithAuth();
    const db2 = getAnotherFirestoreWithAuth();
    await db.collection("book").doc("user-id").set({
      name: "test-name",
      uid: "test-user"
    });
    await db2.collection("book").doc("user-id-2").set({
      name: "test-name-2",
      uid: "test-user-2"
    });
    await assertSucceeds(db.collection("book").doc("user-id").update({test: "update"}));
    await assertFails(db.collection("book").doc("user-id-2").update({test: "update"}));
  });
  it("delete", async () => {
    const db = getFirestoreWithAuth();
    const db2 = getAnotherFirestoreWithAuth();
    await db.collection("book").doc("user-id").set({
      name: "test-name",
      uid: "test-user"
    });
    await db2.collection("book").doc("user-id-2").set({
      name: "test-name-2",
      uid: "test-user-2"
    });
    await assertSucceeds(db.collection("book").doc("user-id").delete());
    await assertFails(db.collection("book").doc("user-id-2").delete());
  });
});