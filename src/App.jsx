import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import { setPosts } from "./store/postSlice.js";
import { login } from "./store/authSlice.js";
import authService from "./aapwrite/Auth.js";
import Loading from "./pages/Loading.jsx";
import service from "./aapwrite/config.js";
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const LogIn = lazy(() => import("./pages/LogIn.jsx"));
const AddPost = lazy(() => import("./pages/AddPost.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const EditPost = lazy(() => import("./pages/EditPost.jsx"));
const Post = lazy(() => import("./pages/Post.jsx"));
const ProfileForm = lazy(() => import("./pages/ProfileForm.jsx"));
const Authentication = lazy(() =>
  import("./component/common/Authentication.jsx")
);

const Error = lazy(import("./pages/Error.jsx"));
//const Search = lazy(import("./pages/Search.jsx"));
import Search from "./pages/Search.jsx";

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);
  const saveLogin = async () => {
    const userdata = await authService.getCurrentUser();
    const profile = await service.getProfile(userdata.email);
    if (userdata && profile) dispatch(login({ userdata, profile }));
  };
  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        dispatch(setPosts(posts?.documents));
      }
    });
    const user = JSON.parse(localStorage.getItem("login"));

    if (!user || userStatus) {
      return;
    }
    saveLogin();
  });
  return (
    <div className="bg-background text-text font-body">
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <Authentication authentication={false}>
                  <Home />
                </Authentication>
              }
            />
            <Route
              path="/login"
              element={
                <Authentication authentication={false}>
                  <LogIn />
                </Authentication>
              }
            />
            <Route
              path="/signin"
              element={
                <Authentication authentication={false}>
                  <SignIn />
                </Authentication>
              }
            />
            <Route
              path="/search"
              element={
                <Authentication authentication={false}>
                  <Search />
                </Authentication>
              }
            />
            <Route
              path="/profile"
              element={
                <Authentication authentication={true}>
                  <Profile />
                </Authentication>
              }
            />
            <Route
              path="/edit-blog/:slug"
              element={
                <Authentication authentication={true}>
                  <EditPost />
                </Authentication>
              }
            />
            <Route
              path="/post/:slug"
              element={
                <Authentication authentication={false}>
                  <Post />
                </Authentication>
              }
            />
            <Route
              path="/add-blog"
              element={
                <Authentication authentication={true}>
                  <AddPost />
                </Authentication>
              }
            />
            <Route
              path="/profile/:slug"
              element={
                <Authentication authentication={true}>
                  <ProfileForm />
                </Authentication>
              }
            />
            <Route path="/*" element={<Error />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
