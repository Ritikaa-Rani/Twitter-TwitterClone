import { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import { useUserAuth } from "../../../context/useUserAuth";
import useLoggedinuser from "../../../hooks/useLoggedinuser";

const Tweetbox = () => {
  const [post, setPost] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;

  const handleuploadimage = (e) => {
    setIsloading(true);
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=801295419b9b0e031bcd3327c6b19df6",
        formData
      )
      .then((res) => {
        setImageurl(res.data.data.display_url);
        // console.log(res.data.data.display_url);
        setIsloading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handletweet = (e) => {
    e.preventDefault();
    if (user?.providerData[0]?.providerId === "password") {
      fetch(`http://localhost:5000/loggedinuser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data[0].name);
          setName(data[0]?.name);
          setUsername(data[0]?.username);
        });
    } else {
      setName(user?.displayName);
      setUsername(email?.split("@")[0]);
    }
    // console.log(name);
    if (name) {
      const userpost = {
        profilephoto: userprofilepic,
        post: post,
        photo: imageurl,
        username: username,
        name: name,
        email: email,
      };
      // console.log(userpost);
      setPost("");
      setImageurl("");
      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userpost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div className="tweetBox">
      <form action="" onSubmit={handletweet}>
        <div className="tweetBox__input">
          <Avatar
            src="loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL"
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon__tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isloading ? (
              <p>Uploading Image</p>
            ) : (
              <p>
                {imageurl ? (
                  "Image Uploaded"
                ) : (
                  <AddPhotoAlternateOutlinedIcon />
                )}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleuploadimage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweets
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tweetbox;
