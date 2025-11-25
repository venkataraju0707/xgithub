import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      setUser(null);
      return;
    }

    setError("");
    setUser(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (res.status === 404) {
        setError("User not found. Try searching for “octocat”.");
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError("Something went wrong. Try again!");
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f3f4f6;
        }

        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px 20px;
        }

        .card {
          background: white;
          width: 100%;
          max-width: 900px;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .title {
          font-size: 30px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .subtitle {
          color: #666;
          margin-bottom: 25px;
          font-size: 15px;
        }

        .search-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-input {
          flex: 1;
          padding: 14px 18px;
          border: none;
          outline: none;
          border-radius: 8px;
          background: #333;
          color: white;
          font-size: 15px;
        }

        .search-btn {
          padding: 12px 22px;
          background: #2563eb;
          border: none;
          color: white;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          transition: 0.2s;
        }

        .search-btn:hover {
          background: #1d4ed8;
        }

        .error-box {
          margin-top: 18px;
          background: #ffe5e5;
          color: #b30000;
          padding: 12px;
          border: 1px solid #ffb3b3;
          border-radius: 8px;
          font-size: 15px;
        }

        .info {
          margin-top: 25px;
          color: #666;
        }

         .user-card {
          margin-top: 25px;
          padding: 25px;
          display: flex;
          gap: 25px;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          text-align: left;
          align-items: center;
        }

        .avatar {
          width: 110px;
          height: 110px;
          border-radius: 50%;
        }

        .user-info {
          flex: 1;
        }

        .name {
          font-size: 22px;
          font-weight: bold;
        }

        .username {
          color: #555;
          margin-left: 6px;
        }

        .stats {
          display: flex;
          gap: 10px;
          margin: 12px 0;
        }

        .badge {
          padding: 6px 12px;
          background: #eef2ff;
          border-radius: 8px;
          font-size: 14px;
          border: 1px solid #d4d7ff;
        }

        .lower-info {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          color: #555;
          font-size: 14px;
        }

        .link {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
      `}</style>

      <div className="container">
        <div className="card">
          <h1 className="title">GitHub User Finder</h1>
          <p className="subtitle">
            Search a GitHub username to see profile details.
          </p>

          <div className="search-row">
           <input
  type="text"
  name="username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && fetchUser()}
  placeholder="e.g. torvalds, gaearon, octocat"
  className="search-input"
/>

            <button className="search-btn" onClick={fetchUser}>Search</button>
          </div>

          {error && <div className="error-box">{error}</div>}

          {!user && !error && (
            <p className="info">No user yet. Try searching for “octocat”.</p>
          )}

          {user && (
            <div className="user-card">
              <img src={user.avatar_url} alt="avatar" className="avatar" />

              <div className="user-info">
                <div className="name">
                  {user.name || "No name"}{" "}
                  <span className="username">@{user.login}</span>
                </div>

                <div className="stats">
                  <div className="badge">{user.public_repos} Repos</div>
                  <div className="badge">{user.followers} Followers</div>
                  <div className="badge">{user.following} Following</div>
                </div>

                <div className="lower-info">
                  <span>📍 {user.location || "Unknown"}</span>

                  {user.twitter_username && (
                    <span>🐦 @{user.twitter_username}</span>
                  )}

                  {user.blog && (
                    <a
                      href={user.blog}
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      🔗 {user.blog}
                    </a>
                  )}

                  <a
                    href={user.html_url}
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    👁 View on GitHub
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
