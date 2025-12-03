import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const Login = ({ setShowLogin }) => {
  const [state, setState] = useState("login"); // login or register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle user login
  const handleLogin = async (email, password) => {
    try {
      setError("");
      setLoading(true);

      // Step 1: Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Fetch user's additional details from Firestore using their UID
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log("Welcome,", userData.name, "!");
        alert(`Welcome back, ${userData.name}!`);
        // Close the login modal on success
        setShowLogin(false);
      } else {
        console.log("No additional user profile found in Firestore.");
        alert("Login successful!");
        setShowLogin(false);
      }
    } catch (error) {
      console.error("Login failed:", error.message);

      // Provide user-friendly error messages
      let errorMessage = error.message;
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format.";
      } else if (error.code === 'auth/network-request-failed' || errorMessage.includes('offline')) {
        errorMessage = "Network error. Please check your internet connection or enable Firestore in Firebase Console.";
      } else if (error.code === 'auth/configuration-not-found') {
        errorMessage = "Firebase authentication is not properly configured.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle user registration
  const handleRegister = async (name, email, password) => {
    try {
      setError("");
      setLoading(true);

      // Validate name field
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }

      // Step 1: Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Save user data to Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: name,
        email: email,
        createdAt: new Date().toISOString()
      });

      console.log("User registered successfully:", name);
      alert(`Welcome, ${name}! Your account has been created.`);
      // Close the login modal on success
      setShowLogin(false);
    } catch (error) {
      console.error("Registration failed:", error.message);

      // Provide user-friendly error messages
      let errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please login instead.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format.";
      } else if (error.code === 'auth/network-request-failed' || errorMessage.includes('offline')) {
        errorMessage = "Network error. Please check your internet connection or enable Firebase services.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (state === "register") {
      await handleRegister(name, email, password);
    } else {
      await handleLogin(email, password);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="password"
            required
          />
        </div>

        <p className="text-sm">
          {state === "register" ? (
            <>Already have an account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">Click here</span></>
          ) : (
            <>Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">Click here</span></>
          )}
        </p>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Please wait..." : state === "register" ? "Create Account" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
