/* eslint-disable react/prop-types */
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home({ initialUser, initialRepos }) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(initialUser);

  const [repos, setRepos] = useState(initialRepos);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const [userRes, reposRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`),
        axios.get(`https://api.github.com/users/${username}/repos`),
      ]);
      setUser(userRes.data);
      setRepos(reposRes.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen xl:p-5 transition-all bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="md:flex xl:p-10 p-4 w-full m-auto">
        <div className="xl:w-1/4 md:w-2/5 w-100 md:mr-6">
          <div className=" rounded-3xl bg-white p-[2rem] mb-4">
            <h1 className="text-3xl xl:text-5xl  font-bold mb-6 bg-gradient-to-b from-rose-400 to-pink-600 bg-clip-text text-transparent">
              GitHub Profile Finder
            </h1>
            <p className="text-base mb-2">Search for a username</p>
            <input
              className="capitalize p-3 text-sm rounded-full w-full mb-4 outline-none border border-gray-300"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
            />
            <button
              className="bg-[#ff3c7d] text-white w-full uppercase rounded-full mb-2 p-3"
              disabled={loading}
              onClick={handleSearch}
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>

          {user ? (
            <div className="bg-[#ffffff] text-center  rounded-3xl p-[2rem] mb-4 md:mb-0">
              <div className="rounded-lg">
                <Image
                  alt="author"
                  className="mb-4 m-auto"
                  height={100}
                  src={user.avatar_url}
                  width={100}
                />

                <h1 className="text-3xl xl:text-5xl font-bold leading-[4.5rem] mb-3">
                  {user.name}
                </h1>
                <p className="mb-3 text-sm">{user.bio}</p>
                <p className="mb-3 text-sm">{user.location}</p>
                <a
                  className="p-3 block text-center text-sm  border-2 capitalize rounded-full w-full"
                  href={user.html_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View Profile on GitHub
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {user ? (
          <div
            className={"xl:w-10/12  md:w-3/5 w-full rounded-3xl p-6  bg-white"}
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">All your repositories</h2>
              <ul className="grid xl:grid-cols-4  md:grid-cols-2 gap-4">
                {repos.map((repo) => (
                  <li
                    className={
                      "aspect-auto xl:p-8 p-6 border border-gray-200 rounded-3xl bg-white "
                    }
                    key={repo.id}
                  >
                    <a
                      className="text-2xl xl:text-3xl  font-bold  mb-3 block capitalize "
                      href={repo.html_url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {repo.name}
                    </a>
                    <p className="text-sm  leading-6 dark:text-gray-300">
                      {repo.description || "No description available."}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div
            className={
              "xl:w-10/12 w-full rounded-3xl p-6  bg-white flex items-center flex-col justify-center"
            }
          >
            <h3 className="text-3xl xl:text-5xl  mb-3  font-bold">About</h3>
            <p className="mb-3 text-sm xl:px-60 text-center">
              The GitHub Profile Search is a JavaScript-based project that
              utilizes the GitHub API to retrieve information about a specified
              user. This project serves as a learning exercise in JavaScript.
            </p>
            <div className="flex gap-2 mt-4">
              <a
                className=" border-2 text-sm capitalize  p-3 text-center rounded-full w-full max-w-sm mb-2 px-10 "
                href="https://www.linkedin.com/in/ydhiman20/"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className=" border-2 text-sm capitalize  p-3 text-center rounded-full w-full max-w-sm mb-2 px-10 "
                href="https://github.com/ydhiman20"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
