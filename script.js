import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* 🔥 PUT YOUR FIREBASE CONFIG HERE */
const firebaseConfig = {
  apiKey: "AIzaSyAMFR3861YNdFznun9aEL7dMXM2jpqdBtw",
  authDomain: "authnova-1f497.firebaseapp.com",
  projectId: "authnova-1f497",
  storageBucket: "authnova-1f497.firebasestorage.app",
  messagingSenderId: "833604968671",
  appId: "1:833604968671:web:21a579161ada40e421096a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ELEMENTS */
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const status = document.getElementById("authStatus");

const authBox = document.getElementById("authBox");
const dashboard = document.getElementById("dashboard");
const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

/* TAB SWITCH */
loginTab.onclick = () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
};

signupTab.onclick = () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
};

/* SIGN UP */
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      status.innerText = "Account created!";
    })
    .catch(err => {
      status.innerText = err.message;
    });
});

/* LOGIN */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      status.innerText = "Login successful!";
    })
    .catch(err => {
      status.innerText = err.message;
    });
});

/* AUTH STATE */
onAuthStateChanged(auth, (user) => {
  if (user) {
    authBox.style.display = "none";
    dashboard.style.display = "block";
    userEmail.innerText = user.email;
  } else {
    authBox.style.display = "block";
    dashboard.style.display = "none";
  }
});

/* LOGOUT */
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});