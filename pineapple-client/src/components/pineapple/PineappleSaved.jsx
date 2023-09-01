import React, { useEffect, useState } from "react";
import { SectionWrapper } from "../../hoc";
import axios from "axios";
import Cookies from "js-cookie";
import { PacmanLoader } from "react-spinners";
import PineappleNavbar from "./PineappleNavbar";
import { styles } from "../../styles";
import SummaryItem from "./SummaryItem";

function PineappleSaved() {
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState(null);

  const getSummaries = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:3000/api/users/summaries`, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        setLoading(false);
        const sortedSummaries = res.data.summaries.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        console.info(">>> sorted summaries: ", sortedSummaries);
        setSummaries(sortedSummaries);
      })
      .catch((error) => {
        console.error(">>> get summaries error: ", error);
        setLoading(false);
        window.alert(error.message);
      });
  };

  const handleDelete = async (id) => {
    console.info(id);
    await axios
      .put(`http://localhost:3000/api/users/summaries/delete`, {id: id}, {
        headers: { Authorization: `Bearer ${Cookies.get("userAuthToken")}` },
      })
      .then((res) => {
        console.info(">>> delete summary res: ", res);
        getSummaries();
      })
      .catch((error) => {
        console.info(">>> delete error summary: ", error);
        window.alert("we encountered an error, please try again");
      });
  };

  useEffect(() => {
    getSummaries();
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto">
      <PineappleNavbar />
      {loading ? (
        <div className="w-full h-screen relative bg-black bg-opacity-60 flex justify-center items-center z-10">
          <PacmanLoader color="rgba(115, 79, 162, 1)" />
        </div>
      ) : (
        ""
      )}

      <div className="flex-[0.75] p-8 rounded-2x1 ">
        <p className={`${styles.sectionSubText}`}>
          Trying to recall something you like?
        </p>
        <h3 className={`${styles.sectionHeadText}`}>Great Picks!</h3>
      </div>

      {/* summary cards */}
      <div>
        {summaries
          ? summaries.map((summary, idx) => {
              return (
                <>
                  <SummaryItem
                    key={idx}
                    summary={summary}
                    getSummaries={getSummaries}
                    handleDelete={handleDelete}
                  />
                </>
              );
            })
          : ""}
      </div>
    </section>
  );
}

export default SectionWrapper(PineappleSaved, "saved");
