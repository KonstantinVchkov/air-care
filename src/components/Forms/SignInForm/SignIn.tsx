import { useEffect, useState } from "react";
import Router from "next/router";
import styles from "./styles.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType === "normal") {
      Router.push("/profile");
    } else if (userType === "admin") {
      Router.push("/dashboard");
    } else if (userType === "inspector") {
      Router.push("/inspection-list");
    }
  }, []);
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://nikola-cucukovski.eu-1.sharedwithexpose.com/aircare/air-care/backend/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status === "success") {
          const user = {
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            type: data.type,
          };

          if (user) {
            localStorage.setItem("email", user.email);
            localStorage.setItem("email", user.firstName);
            localStorage.setItem("email", user.lastName);
            localStorage.setItem("email", user.type);
          } else {
            console.log("No user information found in local storage");
          }
          localStorage.setItem("user", JSON.stringify(user));
          Router.push("/profile");
        } else {
          console.error(data.message);
        }
      } else {
        console.error("Network error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`${styles.loginForm}`}>
      <h2 className="text-center">НАЈАВИ СЕ</h2>

      <label>Е-маил адреса</label>
      <input
        type="text"
        placeholder="someone@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Лозинка</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={`${styles.btnn}`} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
