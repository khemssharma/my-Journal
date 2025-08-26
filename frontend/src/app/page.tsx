// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { login, createUser } from "./lib/user";
import { getEntries, createEntry, JournalEntry } from "./lib/journal";

export default function HomePage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleLogin() {
    try {
      await login(userName, password);
      alert("Logged in!");
      loadJournals();
    } catch (err: unknown) {
      alert(err);
    }
  }

  async function handleSignup() {
    try {
      await createUser(userName, password);
      alert("User created! Now login.");
    } catch (err: unknown) {
      alert(err);
    }
  }

  async function loadJournals() {
    try {
      const data = await getEntries();
      setJournals(data);
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function handleCreateEntry() {
    try {
      await createEntry(title, content);
      setTitle("");
      setContent("");
      loadJournals();
    } catch (err: unknown) {
      alert(err);
    }
  }

  useEffect(() => {
    loadJournals();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Journal App</h1>

      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={handleSignup}>
          Signup
        </button>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>
          Login
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">New Journal Entry</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-purple-500 text-white px-4 py-2" onClick={handleCreateEntry}>
          Save Entry
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Journals</h2>
        {journals.map((j) => (
          <div key={j.id.timestamp} className="mb-4 p-4 border rounded">
            <h3 className="text-lg font-bold">{j.title}</h3>
            <p>{j.content}</p>
            <small className="text-gray-500">{new Date(j.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
