"use client";

import { useEffect, useState } from "react";
import { login, createUser } from "./lib/user";
import {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  JournalEntry,
} from "./lib/journal";

export default function HomePage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleLogin() {
    if (!userName.trim() || !password.trim()) {
      alert("Username and password cannot be empty.");
      return;
    }
    try {
      await login(userName, password);
      alert("Logged in!");
      loadJournals();
    } catch (err: unknown) {
      alert(err);
    }
  }

  async function handleSignup() {
    if (!userName.trim() || !password.trim()) {
      alert("Username and password cannot be empty.");
      return;
    }
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
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }
    try {
      if (editingId) {
        // update
        await updateEntry(editingId, { title, content });
        setEditingId(null);
        alert("Entry updated!");
      } else {
        // create
        await createEntry(title, content);
        alert("Entry created!");
      }
      setTitle("");
      setContent("");
      loadJournals();
    } catch (err: unknown) {
      alert(err);
    }
  }

  async function handleDelete(id: string ) {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      await deleteEntry(id);
      loadJournals();
    } catch (err: unknown) {
      alert(err);
    }
  }

  function handleEdit(entry: JournalEntry) {
    setTitle(entry.title);
    setContent(entry.content);
    setEditingId(entry.id.timestamp); // assuming id has timestamp
  }

  useEffect(() => {
    loadJournals();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Journal App</h1>

      {/* Signup / Login */}
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
        <button
          className="bg-green-500 text-white px-4 py-2 mr-2"
          onClick={handleSignup}
        >
          Signup
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>

      {/* New or Edit Entry */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Journal Entry" : "New Journal Entry"}
        </h2>
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
        <button
          className="bg-purple-500 text-white px-4 py-2"
          onClick={handleCreateEntry}
        >
          {editingId ? "Update Entry" : "Save Entry"}
        </button>
        {editingId && (
          <button
            className="bg-gray-500 text-white px-4 py-2 ml-2"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Journals */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Journals</h2>
        {journals.map((j) => (
          <div key={j.id.timestamp} className="mb-4 p-4 border rounded">
            <h3 className="text-lg font-bold">{j.title}</h3>
            <p>{j.content}</p>
            <small className="text-gray-500">
              {new Date(j.date).toLocaleString()}
            </small>
            <div className="mt-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 mr-2"
                onClick={() => handleEdit(j)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1"
                onClick={() => handleDelete(j.id.timestamp)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
