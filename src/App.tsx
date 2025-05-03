import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/useAuth";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <UserProvider>
        <AppRouter />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
