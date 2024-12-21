import { useState } from "react";
import twitterimg from "../../images/twitter_image.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/useUserAuth";
import "./login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const { googleSignIn } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Add email and password validation
    if (!email || !password || !username || !name) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await signUp(email, password);
      const user = {
        username: username,
        name: name,
        email: email,
        // username: "ritikaranihbz",
        // name:"Ritika",
        // email:"ritikaranihbz@gmail.com"
      };
      // const response = await
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            console.log(data);
            navigate("/");
          }
        });

      // const data = await response.JSON();

      // console.log(data);
    } catch (error) {
      setError(error.message);
      window.alert(error.message);
      // console.log("register", error);
    }
  };

  const handlegooglesignin = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="img-container">
          <img src={twitterimg} alt="Twitter Image" className="image" />
        </div>

        <div className="form-container">
          <div className="form-box">
            <TwitterIcon style={{ color: "#1DA1F2" }} className="icon" />
            <h2 className="heading">Happening now</h2>
            <div className="d-flex align-items-sm-center">
              <h3 className="heading1">Join Twitter Clone Today</h3>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="username"
                className="display-name"
                placeholder="@Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="name"
                className="display-name"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                type="email"
                className="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                className="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="login-btn">
                <button type="submit" className="btn">
                  Sign Up
                </button>
              </div>
            </form>
            <hr style={{ borderWidth: 1, borderStyle: "solid" }} />
            <div>
              <GoogleButton
                className="g-btn"
                type="light"
                onClick={handlegooglesignin}
              />
            </div>
          </div>
          <div>
            Don`t have an account
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#1DA1F2",
                fontWeight: "600",
                marginLeft: "5px",
              }}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
