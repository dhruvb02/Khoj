import React, { useRef, useState, useContext, useEffect } from 'react';
import './ChatComp.css';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';

import appContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBVsHQsx09KjgWIIN5ZIScquRHY484_EV0',
  authDomain: 'firstapp-c9c91.firebaseapp.com',
  projectId: 'firstapp-c9c91',
  storageBucket: 'firstapp-c9c91.appspot.com',
  messagingSenderId: '1095336336332',
  appId: '1:1095336336332:web:730fb55710f71b8aae5b69',
  measurementId: 'G-QT60SRJ8LY'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Main Chat Component
export default function ChatComp() {
  const { chatProductId, chatConvId } = useContext(appContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, u => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <div className="ChatApp">
      <header>
        <h1>Chat</h1>
        {user && <SignOutButton />}
        {user && <BackButton />}
      </header>
      <section>
        {user ? (
          <ChatRoom productId={chatProductId} convId={chatConvId} user={user} />
        ) : (
          <AuthForm />
        )}
      </section>
    </div>
  );
}

// Authentication Form toggles Sign In / Sign Up
function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div>
      {isSignup ? <SignUp /> : <SignIn />}
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button className="link-button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}

// Google Sign-In & Email Sign-In
function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  const onEmailSignIn = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <button className="sign-in chatbutton" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <form onSubmit={onEmailSignIn} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="chatbutton">
          Sign In
        </button>
      </form>
    </div>
  );
}

// Email/Password Sign-Up
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const onEmailSignUp = async e => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onEmailSignUp} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <button type="submit" className="chatbutton">
          Sign Up
        </button>
      </form>
    </div>
  );
}

// Sign Out Button
function SignOutButton() {
  return (
    <button className="sign-out chatbutton" onClick={() => signOut(auth)}>
      Sign Out
    </button>
  );
}

// Back Button
function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="chatbutton" onClick={() => navigate(-1)}>
      Previous
    </button>
  );
}

// Chat Room
function ChatRoom({ productId, convId, user }) {
  const dummy = useRef();
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('convId', '==', convId),
      where('productId', '==', productId),
      orderBy('createdAt', 'asc'),
      limit(100)
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); 
      dummy.current?.scrollIntoView({ behavior: 'smooth' });
    });
    return unsubscribe;
  }, [convId, productId]);

  const sendMessage = async e => {
    e.preventDefault();
    if (!formValue.trim()) return;

    const { uid, photoURL } = user;
    const messagesRef = collection(db, 'messages');
    await addDoc(messagesRef, {
      text: formValue,
      convId,
      productId,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue('');
  };

  return (
    <>
      <main className="mainChat">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} currentUid={user.uid} />
        ))}
        <span ref={dummy}></span>
      </main>
      <form className="chatform" onSubmit={sendMessage}>
        <input
          className="chatInput"
          value={formValue}
          onChange={e => setFormValue(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit" className="chatbutton" disabled={!formValue.trim()}>
          ✈
        </button>
      </form>
    </>
  );
}

// Single Message Component
function ChatMessage({ message, currentUid }) {
  const { text, uid, photoURL } = message;
  const messageClass = uid === currentUid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}> 
      <img
        id="profileimg"
        src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}
        alt="avatar"
      />
      <p>{text}</p>
    </div>
  );
}
