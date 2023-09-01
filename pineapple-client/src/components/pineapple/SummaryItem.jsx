import React, { useState } from "react";
import SummaryEditForm from "./SummaryEditForm";
import axios from "axios";
import Cookies from "js-cookie";

function SummaryItem({ summary, getSummaries, handleDelete }) {
  const [loading, setLoading] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);

  const handleEdit = (episode, title, summary) => {
    setSelectedSummary({
      title: title,
      episode: episode,
      summary: summary,
    });
  };

  return (
    <div className="xs:w-[] w-full flex flex-row my-8">
      <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <h3 className="text-white font-bold text-[24px]">
            {summary.title} - {summary.episode}
          </h3>
          {/* <p className="mt-2 text-secondary text-[14px]">
                        {summary.episode}
                      </p> */}
          <p className="rounded-2xl">{summary.summary}</p>
          <div className="">
            <button
              type="button"
              className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl me-8"
              onClick={() => {
                handleEdit(summary.title, summary.episode, summary.summary);
              }}
            >
              {loading ? "Editing" : "Edit"}
            </button>
            <button
              type="button"
              className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
              onClick={() => {
                handleDelete(summary._id);
              }}
            >
              {loading ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
        <div className="edit-form-container">
          {selectedSummary ? (
            <SummaryEditForm
              id={summary._id}
              title={summary.title}
              episode={summary.episode}
              summary={summary.summary}
              setSelectedSummary={setSelectedSummary}
              getSummaries={getSummaries}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryItem;
