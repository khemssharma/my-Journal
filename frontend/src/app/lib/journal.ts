// lib/journal.ts
import { apiFetch } from "./api";

// Based on your sample response
export interface JournalEntryId {
  timestamp: number;
  date: string; // ISO string
}

export interface JournalEntry {
  id: JournalEntryId; // backend shows an object here
  title: string;
  content: string;
  date: string; // ISO string
}

// Create
export async function createEntry(title: string, content: string): Promise<JournalEntry> {
  return apiFetch<JournalEntry>("/journal", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
}

// Read all
export async function getEntries(): Promise<JournalEntry[]> {
  return apiFetch<JournalEntry[]>("/journal");
}

// Read one
export async function getEntryById(id: string): Promise<JournalEntry> {
  return apiFetch<JournalEntry>(`/journal/id/${id}`);
}

// Update
export async function updateEntry(
  id: string,
  patch: Partial<Pick<JournalEntry, "title" | "content">>
): Promise<JournalEntry> {
  return apiFetch<JournalEntry>(`/journal/id/${id}`, {
    method: "PUT",
    body: JSON.stringify(patch),
  });
}

// Delete
export async function deleteEntry(id: string): Promise<void> {
  return apiFetch<void>(`/journal/id/${id}`, {
    method: "DELETE",
  });
}

/**
 * Helper: safe React key if you don't have the string id.
 * Falls back to timestamp since your payload nests id.
 */
export function entryKey(e: JournalEntry): string {
  // If your backend later returns a string id, use that instead.
  return `${e.id?.timestamp ?? ""}-${e.date}`;
}
