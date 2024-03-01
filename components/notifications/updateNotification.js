import { doc, collection, updateDoc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase/firebaseconfig'; // Assuming you have a file for Firebase configuration

export const updateDeviceTokenInFirestore = async (userId, token,  newValue) => {
  try {
    const userDocRef = doc(collection(FIREBASE_DB, 'users'), userId);

    // Update the boolean value within the deviceTokens object
    await updateDoc(userDocRef, {
      deviceTokens: {
        token : [token],
        allowance: newValue,
      },
    });

    console.log('Device token allowance updated in Firestore.');
  } catch (error) {
    console.error('Error updating device token allowance in Firestore:', error);
  }
};
