//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBITnP07e-cw197VI0h033TahazSPxph9A',
  authDomain: 'auth-7535e.firebaseapp.com',
  projectId: 'auth-7535e',
  storageBucket: 'auth-7535e.appspot.com',
  messagingSenderId: '365896749712',
  appId: '1:365896749712:web:4c34767a6878dd072efe15',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import { libraryLocalStorageHandle } from './library-local-storage';
import { setupGallery } from './auth-index';

//get data when login
export async function downloadGallery() {
  try {
    const querySnapshot = await getDocs(collection(db, 'gallery'));
    const data = querySnapshot.docs.map(doc => doc.data());
    console.log(data);
    setupGallery(data);
  } catch (error) {
    console.log('Error retrieving data:', error);
    const lastObject = galleryObjects[galleryObjects.length - 1];
    console.log('Last object:', lastObject);
  }
}
//add data when login
export async function addGallery() {
  try {
    const galleryObjects = [
      {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      },
      {
        first: 'Alan',
        middle: 'Mathison',
        last: 'Turing',
        born: 1912,
      }, // Alte obiecte de adăugat
      // ...
    ];

    const galleryRef = collection(db, 'gallery');

    for (const galleryObj of galleryObjects) {
      const querySnapshot = await getDocs(
        query(
          galleryRef,
          where('first', '==', galleryObj.first),
          where('last', '==', galleryObj.last)
        )
      );

      if (querySnapshot.empty) {
        const galleryDoc = await addDoc(galleryRef, galleryObj);
        console.log('Document written with ID:', galleryDoc.id);
      } else {
        console.log('Gallery object already exists:', galleryObj);
      }
    }
  } catch (e) {
    console.error('Error adding gallery:', e);
  }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Set an authentication state observer and get user data
onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log('User is signed in');
    addGallery()
      .then(() => {
        console.log('Gallery objects added successfully.');
      })
      .catch(error => {
        console.error('Error adding gallery objects:', error);
      });

    downloadGallery().catch(error => {
      console.log('Error retrieving data:', error);
      const lastObject = galleryObjects[galleryObjects.length - 1];
      console.log('Last object:', lastObject);
    });
    // ...
  } else {
    // User is signed out
    console.log('User is signed out');
    // ...
  }
});
//####################################################
// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;

  const password = signupForm['signup-password'].value;

  // sign up the user
  createUserWithEmailAndPassword(auth, email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});
// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {});
});
// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  signInWithEmailAndPassword(auth, email, password).then(cred => {
    console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
