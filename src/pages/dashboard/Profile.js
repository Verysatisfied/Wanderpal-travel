import React, { useState, useEffect } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../reducers/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Initialize userData with user info from the store or default values
  const [userData, setUserData] = useState({
    name: user?.name || "Default",
    email: user?.email || "",
    lastName: user?.lastName || "LastName",
    location: user?.location || "Cork",
  });

  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("profileImg") || ""
  );

  useEffect(() => {
    // Update profile image from user state if it exists
    if (user?.profileImg) {
      setProfileImg(user.profileImg);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !userData.name ||
      !userData.email ||
      !userData.lastName ||
      !userData.location
    ) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    dispatch(updateUser({ ...userData, profileImg }));
    localStorage.setItem("profileImg", profileImg);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880) {
      // Check if the file size is greater than 5MB
      toast.error("Image must be smaller than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImg(reader.result);
      localStorage.setItem("profileImg", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="profile-img-container">
          {profileImg ? (
            <img src={profileImg} alt="Profile" className="profile-img" />
          ) : (
            <div className="profile-img-default">{userData.name[0]}</div>
          )}
        </div>
        <div className="form-center">
          {/* Use handleChange for text input fields */}
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="Last Name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <div className="form-row">
            <label htmlFor="profileImg" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              name="profileImg"
              onChange={handleFileChange}
              className="form-input"
            />
          </div>
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
