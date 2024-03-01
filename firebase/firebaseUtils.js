import { FIREBASE_DB } from "./firebaseconfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const getUserExpensesCollectionRef = (userId) => {
  console.log("user id in firebaseutills : ", userId);
  const userDocRef = doc(FIREBASE_DB, "users", userId);
  const userCollRef = collection(userDocRef, "userExpenses");
  return userCollRef;
};

// GET EXPENSES
export const getExpensesFromFirestore = async (userId) => {
  try {
    const userExpensesCollectionRef = getUserExpensesCollectionRef(userId);
    const querySnapshot = await getDocs(userExpensesCollectionRef);
    const expenses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Firebase Utils - sending expenses: ", expenses);
    return expenses;
  } catch (error) {
    console.error("Error fetching expenses from Firestore: ", error);
    throw error;
  }
};

// ADD EXPENSES
export const addExpenseToFirestore = async (expense, userId) => {
  console.log("Firebase Utils - expense sent: ", expense);
  try {
    const userExpensesCollectionRef = getUserExpensesCollectionRef(userId);
    const docRef = await addDoc(userExpensesCollectionRef, expense);
    console.log("Expense added successfully to Firestore.");
    return docRef.id;
  } catch (error) {
    console.error("Error adding expense to Firestore: ", error);
    throw error;
  }
};

//UPDATE EXPENSES
export const updateExpenseInFirestore = async (
  expenseId,
  updatedData,
  userId
) => {
  try {
    const userExpensesCollectionRef = getUserExpensesCollectionRef(userId);
    const expenseDocRef = doc(userExpensesCollectionRef, expenseId);
    await updateDoc(expenseDocRef, updatedData);
    console.log("Expense updated successfully in Firestore.");
  } catch (error) {
    console.error("Error updating expense in Firestore: ", error);
    throw error;
  }
};

//DELETE EXPENSES
export const deleteExpenseFromFirestore = async (expenseId, userId) => {
  try {
    const userExpensesCollectionRef = getUserExpensesCollectionRef(userId);
    const expenseDocRef = doc(userExpensesCollectionRef, expenseId);
    await deleteDoc(expenseDocRef);
    console.log("Expense deleted successfully from Firestore.");
  } catch (error) {
    console.error("Error deleting expense from Firestore: ", error);
    throw error;
  }
};
