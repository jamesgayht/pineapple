import React, { useState } from "react";
import axios from "axios";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import PineappleNavbar from "./PineappleNavbar";
import { PacmanLoader } from "react-spinners";

function PineappleUpload() {
  const [title, setTitle] = useState("");
  const [episode, setEpisode] = useState("");
  const [ext, setExt] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // get extension function
  const getExtension = (fileName) => {
    return fileName.split(".").pop();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const inputFile = e.target.files[0];
      console.log(">>> inputFile: ", inputFile);
      setFile(inputFile);
      const inputFileExt = getExtension(inputFile.name);
      console.log(">>> inputFileExt: ", inputFileExt);
      setExt(inputFileExt);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("episode", episode);
    formData.append("ext", ext);
    formData.append("file", file);
    axios
      .post("http://localhost:3000/api/audio/upload_file", formData)
      .then((res) => {
        setLoading(false);
        console.info(">>> audio upload res: ", res);
        setSummary(res.data.summary);
      })
      .catch((err) => {
        console.error(">>> upload audio error: ", err);
        setLoading(false);
        window.alert(err.message);
      });
  };

  const handleSave = (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("episode", episode);
    formData.append("summary", summary);
    console.info(">>> save formdata: ", formData);
    axios
      .post("http://localhost:3000/api/user/summaries", formData)
      .then((res) => {
        setLoading(false);
        console.info(">>> save summary res: ", res);
      })
      .catch((err) => {
        console.error(">>> save summary error: ", err);
        setLoading(false);
        window.alert(err.message);
      });
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      <PineappleNavbar />
      {loading ? (
        <div className="w-full h-screen fixed bg-black bg-opacity-60 flex justify-center items-center z-10">
          <PacmanLoader color="rgba(115, 79, 162, 1)" />
        </div>
      ) : (
        ""
      )}
      <div className="flex-[0.75] bg-black-100 p-8 rounded-2x1">
        <p className={`${styles.sectionSubText}`}>
          Too many podcasts too little time?
        </p>
        <h3 className={`${styles.sectionHeadText}`}>We got you!</h3>
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Podcast Title</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
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
              value={episode}
              onChange={(e) => {
                setEpisode(e.target.value);
              }}
              placeholder="Which episode?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Audio File</span>
            <input
              type="file"
              name="file"
              // value={file}
              onChange={(e) => {
                handleFileChange(e);
              }}
              placeholder="Feed me mp3"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <div className="">
            <button
              type="submit"
              className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
            >
              {loading ? "Generating" : "Generate"}
            </button>
            {summary ? (
              <button
                type="button"
                className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
              >
                {loading ? "Saving" : "Save"}
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>

      {/* display summary */}
      {summary ? (
        <div className="xs:w-[] w-full">
          <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
            <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
              <h3 className={`${styles.sectionHeadText}`}>
                Here&apos;s the summary
              </h3>
              <p className="text-white text-[20px]">{summary}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default SectionWrapper(PineappleUpload, "upload");