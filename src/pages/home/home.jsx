import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadposts() {
      const response = await api.get("posts");
      setPosts(response.data);
    }

    loadposts();

    async function loadUsers() {
      const response = await api.get("users");
      setUsers(response.data);
    }

    loadUsers();
  }, []);

  async function loadComments(id) {
    const response = await api.get(`posts/${id}/comments`);

    if (response.data) {
      setComments(response.data);
    }
  }

  function openComments(e, id) {
    if (id) {
      loadComments(id);
      setX(e.clientX);
      setY(e.clientY);
      window.scrollTo(0, 0);
      const commentsSection = document.querySelector(".comments");
      const container = document.querySelector(".container");
      container.style.overflow = "hidden";
      container.style.height = `${commentsSection.clientHeight}px`;
      commentsSection.classList.remove("disable");
    }
  }

  function closeComments() {
    console.log(x, y);
    window.scrollTo(x, y);
    const commentsSection = document.querySelector(".comments");
    const container = document.querySelector(".container");
    document.body.style.overflow = "";
    container.style.height = "";
    commentsSection.classList.add("disable");
  }

  return (
    <div className="container">
      <div className="postList">
        {posts.map((post) => {
          {
            post.user = users.filter((user) => user.id == post.userId);
          }
          return (
            <div>
              <article key={post.id}>
                <Link to={`/users/${post.userId}`} className="autor">
                  Autor:
                  {post.user[0] != undefined
                    ? ` ${post.user[0].username}`
                    : "Desconhecido"}
                </Link>
                <div className="line"></div>
                <h2 className="title">{post.title}</h2>
                <p>{post.body}</p>
                <button
                  onClick={(e) => openComments(e, post.id)}
                  className="btnViewComments"
                >
                  Visualizar comentarios
                </button>
              </article>

              <div className="comments disable" focus>
                <svg
                  onClick={(e) => closeComments(e)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {comments.map((comment) => {
                  return (
                    <div className="comment">
                      <div className="comment-header">
                        <span>{comment.name}</span>
                      </div>
                      <div className="line"></div>
                      <div className="comment-body">
                        <p>Autor: {comment.email}</p>
                        <p>{comment.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
