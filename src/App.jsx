import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Authentication from "./component/common/Authentication.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignIn from "./pages/SignIn.jsx";
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import MyPost from "./pages/MyPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import { useEffect } from "react";
import service from "./aapwrite/config.js";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "./store/postSlice.js";
import authService from "./aapwrite/Auth.js";
import { login } from "./store/authSlice.js";
import Error from "./pages/Error.jsx";

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        dispatch(setPosts(posts?.documents));
      }
    });
    const user = JSON.parse(localStorage.getItem("login"));

    if (!user || userStatus) {
      return;
    }
    authService
      .logIn(user)
      .then((session) => {
        if (session) {
          authService
            .getCurrentUser()
            .then((userdata) => {
              if (userdata) dispatch(login(userdata));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <div className="bg-background text-text font-body">
      <Router>
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
            path="/all-blogs"
            element={
              <Authentication authentication={true}>
                <AllPost />
              </Authentication>
            }
          />
          <Route
            path="/my-blogs"
            element={
              <Authentication authentication={true}>
                <MyPost />
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
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
