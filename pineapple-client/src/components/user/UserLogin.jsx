import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth/AuthProvider";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { PacmanLoader } from "react-spinners";

function UserLogin() {
  const navigate = useNavigate();
  const { loginSuccess } = useContext(AuthContext);

  // create state to store form data
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://pineapple-a8je.onrender.com/api/users/login", formData)
      .then((response) => {
        console.info(">>> login user response: ", response);
        setLoading(false);
        loginSuccess(response.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(">>> login user error: ", err);
        setLoading(false);
        setError(err.message);
        window.alert(err.message);
      });
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="flex-[0.75] bg-black-100 p-8 rounded-2x1">
        <p className={`${styles.sectionSubText}`}>Nice to hear you again!</p>
        <h3 className={`${styles.sectionHeadText}`}>Login</h3>
        {loading ? (
          <div className="w-full h-screen relative bg-black bg-opacity-60 flex justify-center items-center z-10">
            <PacmanLoader color="rgba(115, 79, 162, 1)" />
          </div>
        ) : (
          <div className="flex-col-reverse flex gap-10 overflow-hidden">
            <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Your Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleFormChange(e, "email");
                  }}
                  placeholder="What's your email?"
                  required
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  Your Password
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    handleFormChange(e, "password");
                  }}
                  placeholder="What's your password?"
                  required
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                />
              </label>
              <div>
                <button
                  type="submit"
                  className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl mx-3"
                >
                  {loading ? "Almost There!" : "Login"}
                </button>

                <button
                  type="button"
                  className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl mx-3"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default SectionWrapper(UserLogin, "login");
