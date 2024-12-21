import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Posts from "../Posts/Posts";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import LockResetIcon from "@mui/icons-material/LockReset";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Editprofile from "../Editprofile/Editprofile";
import "./Mainprofile.css";
import axios from "axios";
import useLoggedinuser from "../../../hooks/useLoggedinuser";

const Mainprofile = ({ user }) => {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [loggedinuser] = useLoggedinuser(); // Initialize loggedinuser properly
  const username = user?.email?.split("@")[0];
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/userpost?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
  }, [user.email]);

  const handleuploadcoverimage = (e) => {
    setIsloading(true);
    const image = e.target.files[0];
    // console.log(image);
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=801295419b9b0e031bcd3327c6b19df6",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        // console.log(res.data.data.display_url);
        const usercoverimage = {
          email: user?.email,
          coverimage: url,
        };
        setIsloading(false);
        if (url) {
          fetch(`http://localhost:5000/userupdate/${user?.email}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usercoverimage),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("done", data);
            });
        }
      })
      .catch((e) => {
        console.log(e);
        window.alert(e);
        setIsloading(false);
      });
  };

  const handleuploadprofileimage = (e) => {
    setIsloading(true);
    const image = e.target.files[0];
    // console.log(image);
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=801295419b9b0e031bcd3327c6b19df6",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        // console.log(res.data.data.display_url);
        const userprofileimage = {
          email: user?.email,
          profileImage: url,
        };
        setIsloading(false);
        if (url) {
          fetch(`http://localhost:5000/userupdate/${user?.email}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userprofileimage),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("done", data);
            });
        }
      })
      .catch((e) => {
        console.log(e);
        window.alert(e);
        setIsloading(false);
      });
  };

  // const data = [
  //   {
  //     _id: "1",
  //     name: "Jane Doe",
  //     username: "jane_doe",
  //     profilePhoto: "https://example.com/profiles/jane.jpg",
  //     post: "Exploring the new features in JavaScript! 🚀 #coding #JavaScript",
  //     photo: "https://example.com/posts/javascript.png",
  //   },
  //   {
  //     _id: "2",
  //     name: "John Smith",
  //     username: "johnsmith",
  //     profilePhoto: "https://example.com/profiles/john.jpg",
  //     post: "Just finished a great workout session! 💪 #fitness #health",
  //     photo: "https://example.com/posts/workout.png",
  //   },
  //   {
  //     _id: "3",
  //     name: "Alice Johnson",
  //     username: "alicejohnson",
  //     profilePhoto: "https://example.com/profiles/alice.jpg",
  //     post: "Loving the new features in CSS! #webdevelopment #design",
  //     photo: "https://example.com/posts/css.png",
  //   },
  // ];

  return (
    <div>
      <ArrowBackIcon className="arrow-icon" onClick={() => navigate("/")} />
      <h4 className="heading-4">{username}</h4>
      <div className="mainprofile">
        <div className="profile-bio">
          <div>
            <div className="coverImageContainer">
              <img
                src={
                  loggedinuser[0]?.coverimage
                    ? loggedinuser[0].coverimage
                    : user && user.photoURL
                }
                alt=""
                className="coverImage"
              />
              <div className="hoverCoverImage">
                <div className="imageIcon_tweetButton">
                  <label htmlFor="image" className="imageIcon">
                    {isloading ? (
                      <LockResetIcon className="photoIcon photoIconDisabled" />
                    ) : (
                      <CenterFocusWeakIcon className="photoIcon" />
                    )}
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="imageInput"
                    onChange={handleuploadcoverimage}
                  />
                </div>
              </div>
            </div>

            <div className="avatar-img">
              <div className="avatarContainer">
                <img
                  src={
                    loggedinuser[0]?.profileImage
                      ? loggedinuser[0].profileImage
                      : user && user.photoURL
                  }
                  alt=""
                  className="avatar"
                />
                <div className="hoverAvatarImage">
                  <div className="imageIcon_tweetButton">
                    <label htmlFor="profileImage" className="imageIcon">
                      {isloading ? (
                        <LockResetIcon className="photoIcon photoIconDisabled" />
                      ) : (
                        <CenterFocusWeakIcon className="photoIcon" />
                      )}
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      className="imageInput"
                      onChange={handleuploadprofileimage}
                    />
                  </div>
                </div>
              </div>

              <div className="userInfo">
                <div>
                  <h3 className="heading-3">
                    {loggedinuser[0]?.name
                      ? loggedinuser[0].name
                      : user && user.displayname}
                  </h3>
                  <p className="usernameSection">@{username}</p>
                </div>
                <Editprofile user={user} loggedinuser={loggedinuser} />
              </div>

              <div className="infoContainer">
                {loggedinuser[0]?.bio ? <p>{loggedinuser[0].bio}</p> : ""}
                <div className="locationAndLink">
                  {loggedinuser[0]?.location ? (
                    <p className="suvInfo">
                      <MyLocationIcon /> {loggedinuser[0].location}
                    </p>
                  ) : (
                    ""
                  )}
                  {loggedinuser[0]?.website ? (
                    <p className="subInfo link">
                      <AddLinkIcon /> {loggedinuser[0].website}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <h4 className="tweetsText">Tweets</h4>
              <hr />
            </div>

            {post.map((p) => (
              <Posts p={p} key={p._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Mainprofile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired, // Ensure email is a string and required
    photoURL: PropTypes.string, // Optional string
    displayname: PropTypes.string, // Optional string
  }), // Ensure the user object is required
};

export default Mainprofile;
