import { useState } from "react";
import twitterimg from "../../images/twitter_image.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/useUserAuth";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { googleSignIn, Login } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Add email and password validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Authenticate user and then redirect
      // Replace with actual authentication logic
      await Login(email, password)
      navigate("/");
    } catch (error) {
      setError(error.message);
      window.alert(error.message);
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
            <TwitterIcon style={{ color: "#1DA1F2" }}  className="icon"/>
            <h2 className="heading">Happening now</h2>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="email"
                placeholder="Enter email address"
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                className="password"
                placeholder="Enter password"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="login-btn">
                <button type="submit" className="btn">
                  Log In
                </button>
              </div>
            </form>
            <hr style={{borderWidth: 1, borderStyle: 'solid' }}/>
            <div>
              <GoogleButton className="g-btn" type="light"  onClick={handlegooglesignin}/>
            </div>
          </div>
          <div>
            Don`t have an account
            <Link
              to="/Signup"
              style={{
                textDecoration: "none",
                color: "#1DA1F2",
                fontWeight: "600",
                marginLeft: "5px",
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
