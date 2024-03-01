import { FIREBASE_AUTH } from "../../firebase/firebaseconfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setUserId } from "../../redux/actions/userActions";
import { setExpenseDocId } from "../../redux/actions/expenseActions";
import NotificationsComponent from "../notifications/notifications";

const handleLogin = async (values, isLoginMode, dispatch, navigation) => {
  const { email, password } = values;
  try {
    if (isLoginMode) {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login successful:", user);
    } else {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered with ID: ", user.uid);
    }
    dispatch(setUserId(user.uid));
    dispatch(setExpenseDocId(user.uid));
    NotificationsComponent();
    navigation.navigate('TabNavigator');
  } catch (error) {
    console.log("Error regisering user: ", error);
  }
};

const toggleMode = (isLoginMode, setIsLoginMode) => {
  setIsLoginMode((prevMode) => !prevMode);
};

export { handleLogin, toggleMode };
