import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Modal } from "@mui/material";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Editprofile.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  borderShadow: 24,
  borderRadius: 8,
};

function Editchild({ setDob }) {
  const [open, setOpen] = useState(false);
  const handleopen = () => {
    setOpen(true);
  };
  const handleclose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className="birthdate-section" onClick={handleopen}></div>
      <text>Edit</text>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleclose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 300 }}>
          <div className="text">
            <h2>Edit date of birth</h2>
            <p>
              This can only be changed a few times
              <br />
              Make sure you enter the age of the <br />
              Person using the aacount.{" "}
            </p>
            <input type="date" onChange={(e) => setDob(e.target.value)} />
            <Button
              className="e-button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Editprofile = ({ user, loggedinuser }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [open, setOpen] = useState("");
  const [dob, setDob] = useState("");

  const handlesave = () => {
    const editinfo = {
      name,
      bio,
      location,
      website,
      dob,
    };
    fetch(`http://localhost:5000/userupdate/${user?.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editinfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("done", data);
      });
  };

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="Edit-profile-btn"
      >
        Edit Profile
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style} className="modal">
          <div className="header">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <Button className="save-btn" onClick={handlesave}>
              Save
            </Button>
          </div>
          <form action="" className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label="Name"
              id="fullwidth"
              variant="filled"
              onChange={(e) => setName(e.target.value)}
              defaultValue={loggedinuser[0]?.name ? loggedinuser[0].name : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Bio"
              id="fullwidth"
              variant="filled"
              onChange={(e) => setBio(e.target.value)}
              defaultValue={loggedinuser[0]?.bio ? loggedinuser[0].bio : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Location"
              id="fullwidth"
              variant="filled"
              onChange={(e) => setLocation(e.target.value)}
              defaultValue={
                loggedinuser[0]?.location ? loggedinuser[0].location : ""
              }
            />
            <TextField
              className="text-field"
              fullWidth
              label="Website"
              id="fullwidth"
              variant="filled"
              onChange={(e) => setWebsite(e.target.value)}
              defaultValue={
                loggedinuser[0]?.website ? loggedinuser[0].website : ""
              }
            />
          </form>
          <div className="birthdate-section">
            <p>Birth Date</p>
            <p>.</p>
            <Editchild dob={dob} setDob={setDob} />
          </div>
          <div className="last-section">
            {loggedinuser[0]?.dob ? (
              <h2>{loggedinuser[0]?.dob}</h2>
            ) : (
              <h2>{dob ? dob : "Add your date of birth"}</h2>
            )}
            <div className="last-btn">
              <h2>Switch to professional</h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

Editchild.propTypes = {
  setDob: PropTypes.func,
};

Editprofile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  loggedinuser: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      location: PropTypes.string,
      website: PropTypes.string,
      dob: PropTypes.string,
    })
  ),
};

export default Editprofile;
