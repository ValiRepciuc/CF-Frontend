import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/useAuth";
import Login from "./features/auth/pages/Login";

function App() {
  return (
    <>
      <UserProvider>
        <Login></Login>
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
