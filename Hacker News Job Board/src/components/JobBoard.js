import React, { useState, useEffect } from "react";
import axios from "axios";
import "/src/styles/JobBoard.css";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Set loading initially to true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobIDsResponse = await axios.get(
          "https://hacker-news.firebaseio.com/v0/jobstories.json"
        );
        const jobIDs = jobIDsResponse.data;

        const startIndex = (page - 1) * 6;
        const endIndex = startIndex + 6;
        const pageJobIDs = jobIDs.slice(startIndex, endIndex);

        const jobPromises = pageJobIDs.map(async (jobID) => {
          const response = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${jobID}.json`
          );
          return response.data;
        });

        const jobsData = await Promise.all(jobPromises);
        setJobs((prevJobs) => [...prevJobs, ...jobsData]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="job-board">
      <h1 className="title">Hacker News Job Board</h1>
      {loading && <p className="loading-indicator">Loading...</p>}
      <div className="job-listings">
        {jobs.map((job) => (
          <div key={job.id} className="job-listing">
            <h2 className="job-title">
              {job.url ? (
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </a>
              ) : (
                job.title
              )}
            </h2>
            <p>
              By {job.by} on {new Date(job.time * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {!loading && (
        <button className="load-more-button" onClick={loadMore}>
          Load More Jobs
        </button>
      )}
    </div>
  );
};

export default JobBoard;
