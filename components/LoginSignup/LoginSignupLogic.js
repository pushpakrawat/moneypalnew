import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase/firebaseconfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setUserId } from "../../redux/actions/userActions";
import { setExpenseDocId } from "../../redux/actions/expenseActions";
import { doc, setDoc } from "firebase/firestore";

const handleLogin = async (values, isLoginMode, dispatch, navigation) => {
  const { email, password } = values;
  try {
    if (isLoginMode) {
      console.log("LoginMode: ", isLoginMode)
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login successful:", user);
      dispatch(setUserId(user.uid));
      dispatch(setExpenseDocId(user.uid));
    } else {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered with ID: ", user.uid);
      // Set themeMode to 'light' in Firestore
      const userDocRef = doc(FIREBASE_DB, "users", user.uid);

      // Update the existing document
      await setDoc(userDocRef, { themeMode: "light" });

      dispatch(setUserId(user.uid));
      dispatch(setExpenseDocId(user.uid));
    }
    navigation.navigate('TabNavigator');
  } catch (error) {
    console.log("Error regisering user: ", error);
  }
};

const toggleMode = (isLoginMode, setIsLoginMode) => {
  setIsLoginMode((prevMode) => !prevMode);
};

export { handleLogin, toggleMode };
