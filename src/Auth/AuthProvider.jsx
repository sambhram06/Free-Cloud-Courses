import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_IQxuZZcBN",
  client_id: "6877ph5ofmlnpo8tetot0bguut",
  redirect_uri: "http://localhost:5173/callback", 
  response_type: "code",
  scope: "phone openid email",
};


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);