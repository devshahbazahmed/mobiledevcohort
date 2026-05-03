import { useEffect, useState } from 'react';
import './githubProfile.css';

const GithubProfile = () => {
  const [user, setUser] = useState({});

  async function getData() {
    const response = await fetch(
      `https://api.github.com/users/aestheticsuraj234`
    );
    console.log(response);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <main className="profile-page">
      <section className="profile-card" aria-label="GitHub profile">
        <div className="profile-top">
          <div className="avatar" aria-hidden="true">
            AC
          </div>
          <div>
            <p className="eyebrow">GitHub Profile</p>
            <h1>Alex Carter</h1>
            <p className="username">@alexcodes</p>
          </div>
        </div>

        <p className="bio">
          Frontend developer building clean React interfaces and thoughtful
          mobile-first experiences.
        </p>

        <div className="stats" aria-label="Profile stats">
          <div>
            <strong>42</strong>
            <span>Repos</span>
          </div>
          <div>
            <strong>1.8k</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong>96</strong>
            <span>Stars</span>
          </div>
        </div>

        <div className="actions">
          <a
            className="primary-action"
            href="https://github.com"
            target="_blank"
          >
            View Profile
          </a>
          <button type="button">Follow</button>
        </div>
      </section>
    </main>
  );
};

export default GithubProfile;
