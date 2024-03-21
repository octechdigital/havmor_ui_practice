import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "./lib/consts";
// import PrivateRoute from "./helpers/PrivateRoute";
import HomePage from "./Pages/HomePage/HomePage";
import PlayAndQuizPage from "./Pages/PlayAndQuizPage/PlayAndQuizPage";
import QuizPage from "./Pages/QuizPage/QuizPage";
import LeaderboardPage from "./Pages/LeaderboardPage/LeaderboardPage";
import ShareReferralPage from "./Pages/ShareReferralPage/ShareReferralPage";
import UserDetailPage from "./Pages/UserDetailsPage/UserDetailsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage/>} />
        <Route path={ROUTES.USER_DETAIL} element={<UserDetailPage/>} />
        <Route path={ROUTES.PLAYMORE_QUIZ} element={<PlayAndQuizPage/>} />
        <Route path={ROUTES.QUIZ} element={<QuizPage/>} />
        <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage/>} />
        <Route path={ROUTES.SHAREREFERRAL} element={<ShareReferralPage/>} />
        
        {/* <Route
          path={ROUTES.PRIVATE_ROUTE}
          element={
            <PrivateRoute>
              <p>Your Private route component here</p>
            </PrivateRoute>
          }
        /> */}
      </Routes>
      <ToastContainer position="bottom-center" hideProgressBar={true} />
    </div>
  );
}

export default App;
