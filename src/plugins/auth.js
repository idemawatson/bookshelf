import firebase from "./firebase";

const signUp = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    const errorCode = error.code;
    let message = "";
    switch (errorCode) {
      case "auth/email-already-in-use":
        message = "既に登録済みのアドレスです";
        break;
      case "auth/invalid-email":
        message = "無効なアドレスです";
        break;
      case "auth/weak-password":
        message = "パスワードの強度が不十分です";
        break;
      default:
        message = "認証エラー";
        break;
    }
    throw new Error(message);
  }
};

const login = async (email, password) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    const errorCode = error.code;
    let message = "";
    switch (errorCode) {
      case "auth/user-diabled":
        message = "無効なユーザーです";
        break;
      case "auth/invalid-email":
        message = "無効なアドレスです";
        break;
      case "auth/user-not-found":
        message = "ユーザーが見つかりません\nアドレスを確認してください";
        break;
      case "auth/wrong-password":
        message = "パスワードが違います";
        break;
      default:
        message = "認証エラー";
        break;
    }
    throw new Error(message);
  }
};

export { signUp, login };
