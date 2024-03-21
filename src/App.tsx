import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "./lib/consts";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<p>LOGIN</p>} />
        <Route
          path={ROUTES.PRIVATE_ROUTE}
          element={
            <PrivateRoute>
              <p>Your Private route component here</p>
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="bottom-center" hideProgressBar={true} />
    </div>
  );
}

export default App;
