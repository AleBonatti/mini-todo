export default function About() {
  return (
    <div className="container">
      <h1>About</h1>
      <p>
        Mini To-Do è un progettino didattico per ripassare React: componenti, stato,
        effetti, routing, persistenza (localStorage/API) e test con Vitest/RTL.
      </p>
      <ul>
        <li>Vite + TypeScript</li>
        <li>React Router (BrowserRouter, Routes, Route)</li>
        <li>json-server per API mock (opzionale)</li>
      </ul>
    </div>
  );
}
