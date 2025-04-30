import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/useAuth";
import Auth from "./features/auth/pages/Auth";

function App() {
  return (
    <>
      <UserProvider>
        <Auth />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
