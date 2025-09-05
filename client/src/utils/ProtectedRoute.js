// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("token");
//   const isProUser = localStorage.getItem("isPro"); // e.g., "true"

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   if (isProUser !== "true") {
//     return <Navigate to="/pro-version" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
