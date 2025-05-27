import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/useAuth";
import AppRouter from "./router/AppRouter";
import { ChallengeProvider } from "./context/useChallenge";

function App() {
  return (
    <>
      <UserProvider>
        <ChallengeProvider>
          <AppRouter />
          <ToastContainer />
        </ChallengeProvider>
      </UserProvider>
    </>
  );
}

export default App;
