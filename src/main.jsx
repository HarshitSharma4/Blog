import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
//import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Authentication from "./component/common/Authentication.jsx";
// import LogIn from "./pages/LogIn.jsx";
// import SignIn from "./pages/SignIn.jsx";
// import AllPost from "./pages/AllPost.jsx";
// import AddPost from "./pages/AddPost.jsx";
// import MyPost from "./pages/MyPost.jsx";
// import EditPost from "./pages/EditPost.jsx";
// import Post from "./pages/Post.jsx";
// const route = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     children: [
//       {
//         path: "/login",
//         element: <LogIn />,
//       },
//       {
//         path: "/signin",
//         element: <SignIn />,
//       },
//       {
//         path: "/all-posts",
//         element: <AllPost />,
//       },
//       {
//         path: "/my-posts",
//         element: (
//           <Authentication>
//             <MyPost />
//           </Authentication>
//         ),
//       },
//       {
//         path: "/edit-post/:slug",
//         element: (
//           <Authentication>
//             <EditPost />
//           </Authentication>
//         ),
//       },
//       {
//         path: "/post/:slug",
//         element: (
//           <Authentication>
//             <Post />
//           </Authentication>
//         ),
//       },
//       {
//         path: "/post/add-post",
//         element: (
//           <Authentication>
//             <AddPost />
//           </Authentication>
//         ),
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
