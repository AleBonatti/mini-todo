import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { ThemeProvider } from './context/ThemeProvider';
import { useTheme } from './context/ThemeContext';

function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();
  return (
    <>
      <header className="app-header" style={{ gap: 12 }}>
        <nav style={{ display: 'flex', gap: 12 }}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            About
          </NavLink>
        </nav>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={toggle}>Theme: {theme}</button>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}

function NotFound() {
  return (
    <div className="container">
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
