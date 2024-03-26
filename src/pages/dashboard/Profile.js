import { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../reducers/userSlice";
import { useEffect } from "react";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("profileImg") || ""
  );
  useEffect(() => {
    if (user?.profileImg) {
      setProfileImg(user.profileImg);
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    dispatch(updateUser({ ...userData, profileImg }));
    localStorage.setItem("profileImg", profileImg);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880) {
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

  const getInitials = (name) => name[0].toUpperCase();

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="profile-img-container">
          {profileImg ? (
            <img src={profileImg} alt="Profile" className="profile-img" />
          ) : (
            <div className="profile-img-default">
              {getInitials(userData.name)}
            </div>
          )}
        </div>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleFileChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleFileChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleFileChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleFileChange}
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
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
