import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    taluka: "",
    district: "",
    state: "",
    gender: "",
    image: "",
  });

  const [tempImage, setTempImage] = useState(""); // temp image before save
  const [talukas, setTalukas] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Load current user
  useEffect(() => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(u => u.email === currentUserEmail);
    if (currentUser) {
      setUser(currentUser);
      setTempImage(currentUser.image || "");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePincodeBlur = async () => {
    if (user.pincode.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${user.pincode}`);
        const postOffices = response.data[0].PostOffice;
        if (postOffices && postOffices.length > 0) {
          const uniqueTalukas = [...new Set(postOffices.map(po => po.Block || po.Taluka))];
          setTalukas(uniqueTalukas);
          setUser(prev => ({
            ...prev,
            taluka: uniqueTalukas[0],
            district: postOffices[0].District,
            state: postOffices[0].State
          }));
        }
      } catch (err) {
        console.error(err);
        alert("Invalid Pincode");
      }
    }
  };

  const handleTalukaSelect = (taluka) => {
    setUser(prev => ({ ...prev, taluka }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Remove editable fields & temp image
  const handleRemove = () => {
    setUser(prev => ({
      ...prev,
      mobile: "",
      address: "",
      pincode: "",
      taluka: "",
      district: "",
      state: "",
      gender: "",
    }));
    setTempImage(""); // reset temp image
    setTalukas([]);
  };

  // Save profile including image
  const handleSave = () => {
    const currentUserEmail = user.email;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUser = { ...user, image: tempImage }; // commit tempImage
    const otherUsers = users.filter(u => u.email !== currentUserEmail);
    localStorage.setItem("users", JSON.stringify([...otherUsers, updatedUser]));
    setUser(updatedUser);
    setTempImage(updatedUser.image); // sync tempImage
    setEditMode(false);
    alert("Profile saved ✅");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        {tempImage || user.image ? (
          <img className="profile-image" src={tempImage || user.image} alt="Profile" />
        ) : (
          <div className="profile-placeholder">Upload Image</div>
        )}

        <div className="profile-info">
          <div><strong>Name:</strong> {user.name}</div>
          <div><strong>Email:</strong> {user.email}</div>
        </div>

        {editMode && (
          <>
            <input type="text" name="mobile" placeholder="Mobile" value={user.mobile} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={user.address} onChange={handleChange} />
            <input type="text" name="pincode" placeholder="Pincode" value={user.pincode} onChange={handleChange} onBlur={handlePincodeBlur} />

            {talukas.length > 0 && (
              <div className="radio-group">
                <label><strong>Select Taluka:</strong></label>
                {talukas.map((t, idx) => (
                  <label key={idx} className="radio-label">
                    <input type="radio" name="taluka" value={t} checked={user.taluka === t} onChange={() => handleTalukaSelect(t)} />
                    {t}
                  </label>
                ))}
              </div>
            )}

            <input type="text" name="district" placeholder="District" value={user.district} readOnly />
            <input type="text" name="state" placeholder="State" value={user.state} readOnly />

            <div className="radio-group">
              <label><strong>Gender:</strong></label>
              <label className="radio-label">
                <input type="radio" name="gender" value="Male" checked={user.gender === "Male"} onChange={handleChange} /> Male
              </label>
              <label className="radio-label">
                <input type="radio" name="gender" value="Female" checked={user.gender === "Female"} onChange={handleChange} /> Female
              </label>
            </div>

            <input type="file" accept="image/*" onChange={handleImageUpload} />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button className="profile-button" onClick={handleSave}>Save</button>
              <button className="profile-button remove" onClick={handleRemove}>Remove</button>
            </div>
          </>
        )}

        {!editMode && <button className="profile-button" onClick={() => setEditMode(true)}>Edit</button>}
      </div>
    </div>
  );
}