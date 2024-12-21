import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup";
import Feed from "./pages/Feed/Feed";
import Explore from "./pages/Explore/Explore";
import Notification from "./pages/Notification/Notification";
import ProtectedRoute from "./pages/ProtectedRoute";
import Messages from "./pages/Messages/Messages";
import Lists from "./pages/Lists/Lists";
import Bookmark from "./pages/Bookmark/Bookmark";
import Profile from "./pages/Profile/Profile";
import More from "./pages/More/More";
import { UserAuthContextProvider } from "./context/Userauthcontext";

function App() {
  return (
    <div className="app">
      <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >
              <Route index element={<Feed />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />}>
              <Route path="feed" element={<Feed />} />
              <Route path="explore" element={<Explore />} />
              <Route path="notification" element={<Notification />} />
              <Route path="messages" element={<Messages />} />
              <Route path="lists" element={<Lists />} />
              <Route path="bookmarks" element={<Bookmark />} />
              <Route path="profile" element={<Profile />} />
              <Route path="more" element={<More />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
