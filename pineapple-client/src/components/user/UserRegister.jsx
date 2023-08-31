import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";

function UserRegister() {
  const navigate = useNavigate();

  // create state to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3000/api/users/register", formData)
      .then((response) => {
        console.info(">>> register user response: ", response);
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        console.error(">>> register user error: ", err);
        setLoading(false);
        setError(err.message);
        window.alert(err.message);
      });
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="flex-[0.75] bg-black-100 p-8 rounded-2x1">
        <p className={`${styles.sectionSubText}`}>Howdy Hey!</p>
        <h3 className={`${styles.sectionHeadText}`}>Register</h3>
        <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  handleFormChange(e, "name");
                }}
                placeholder="What's your name?"
                required
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              />
            </label>

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
              <span className="text-white font-medium mb-4">Your Password</span>
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
                className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
              >
                {loading ? "Sending" : "Send"}
              </button>

              <button
                type="button"
                className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SectionWrapper(UserRegister, "register");
