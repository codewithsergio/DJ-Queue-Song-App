// import viteLogo from "/vite.svg";
import Dashboard from "./components/Dashboard";
import SongForm from "./components/SongForm";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import { createBrowserRouter, Route } from "react-router-dom";
import { createRoutesFromElements, RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<RootLayout />}>
        <Route
          index
          element={
            <>
              <Dashboard />
            </>
          }
        />
        <Route
          path="songform"
          element={
            <>
              <SongForm />
            </>
          }
        />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
