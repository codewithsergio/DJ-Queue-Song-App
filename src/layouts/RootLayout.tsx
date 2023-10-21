import { Outlet } from "react-router-dom";
import "./RootLayout.css";

function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        {/* ScrollToTop */}
        {/* Navbar */}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* Clients */}
        {/* Footer */}
      </footer>
    </div>
  );
}

export default RootLayout;
