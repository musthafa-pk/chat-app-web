// app.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// References to the DOM elements
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Collection reference to "messages"
const messagesRef = collection(db, 'messages');

// Function to display messages in real-time
function displayMessages() {
  const q = query(messagesRef, orderBy('timestamp'));
  onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = ''; // Clear the chat box
    snapshot.forEach(doc => {
      const message = doc.data();
      const messageElement = document.createElement('div');
      messageElement.textContent = `${message.user}: ${message.text}`;
      chatBox.appendChild(messageElement);
    });
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
  });
}

// Send message
sendBtn.addEventListener('click', async () => {
  const message = chatInput.value.trim();
  if (message) {
    await addDoc(messagesRef, {
      user: "Anonymous", // You can replace this with authenticated user's name
      text: message,
      timestamp: new Date()
    });
    chatInput.value = ''; // Clear the input
  }
});

// Call the function to start displaying messages
displayMessages();
