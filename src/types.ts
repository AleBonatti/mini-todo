// src/types.ts

// Livello di priorità di un task
export type Priority = "low" | "medium" | "high";

// Tipo principale del To-Do
export type Todo = {
  id: string;            // UUID generato lato client
  text: string;          // testo descrittivo del task
  done: boolean;         // true se completato
  createdAt: number;     // timestamp di creazione (Date.now)
  completedAt?: number;  // timestamp di completamento (opzionale)
  dueDate?: string;      // data di scadenza in formato ISO (es. "2025-10-10")
  priority: Priority;    // livello di priorità
};
