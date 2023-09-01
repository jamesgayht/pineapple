import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { PacmanLoader } from "react-spinners";
import PineappleNavbar from "./PineappleNavbar";
import { styles } from "../../styles";

function SummaryEditForm({
  id,
  title,
  episode,
  summary,
  setSelectedSummary,
  getSummaries,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: title,
    episode: episode,
    summary: summary,
  });

  const handleFormChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .put(`https://pineapple-a8je.onrender.com/api/users/summaries/${id}`, formData, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        setLoading(false);
        console.info(">>> update summary res: ", res);
        setSelectedSummary(null);
        getSummaries();
      })
      .catch((err) => {
        setLoading(false);
        console.info(">>> update summary error: ", err);
        window.alert("update summary error, please try again");
      });
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-screen relative bg-black bg-opacity-60 flex justify-center items-center z-10">
          <PacmanLoader color="rgba(115, 79, 162, 1)" />
        </div>
      ) : (
        ""
      )}
      <div className="flex-[0.75] p-8 rounded-2x1">
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Podcast Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => {
                handleFormChange(e, "title");
              }}
              placeholder="What's the title?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Podcast Episode</span>
            <input
              type="text"
              name="episode"
              value={formData.episode}
              onChange={(e) => {
                handleFormChange(e, "episode");
              }}
              placeholder="Which episode?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Summary</span>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={(e) => {
                handleFormChange(e, "summary");
              }}
              placeholder="Which episode?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <div className="">
            <button
              type="submit"
              className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
            >
              {loading ? "Updating" : "Update"}
            </button>
            {summary ? (
              <button
                type="button"
                className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
                onClick={() => {
                  setSelectedSummary(null);
                }}
              >
                {loading ? "Cancelling" : "Cancel"}
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default SummaryEditForm;
