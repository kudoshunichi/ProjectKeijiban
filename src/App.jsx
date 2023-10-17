import React, { useState } from "react";
import "./styles.css";
import BasicCard from "./components/card";
import { SearchBar } from "./components/SearchBar";
import { PostArea } from "./components/PostArea";
import { UserRegistration } from "./components/UserRegist";

export const App = () => {
  const [word, setWord] = useState("");
  const [post, setPost] = useState("");
  const [sleads, setSleads] = useState([
    { id: "例の投稿1", body: "例の本文1" }
  ]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  // 既存の関数
  const handleSearchChange = (event) => setWord(event.target.value);
  const handlePostChange = (event) => setPost(event.target.value);
  const handleSearchClick = () => {
    const filteredSleads = sleads.filter((slead) => slead.body.includes(word));
    setSleads(filteredSleads);
  };
  const handleAddClick = () => {
    if (post) {
      const newSlead = { id: `${sessionStorage.username}`, body: post }; // ユーザー名を使用
      setSleads([...sleads, newSlead]);
      setPost("");
    }
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleUserIdChange = (event) => setUserId(event.target.value);
  const handleUserAddClick = () => {
    if (username && userId) {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("userId", userId);
      setUsername("");
      setUserId("");
    }
  };

  return (
    <>
      <h1 class="title">学習用掲示板</h1>
      <div class="container">
        <div class="main">
          <SearchBar
            word={word}
            handleSearchChange={handleSearchChange}
            handleSearchClick={handleSearchClick}
          />
          <PostArea
            post={post}
            handlePostChange={handlePostChange}
            handleAddClick={handleAddClick}
          />
        </div>
        <UserRegistration
          username={username}
          userId={userId}
          handleUsernameChange={handleUsernameChange}
          handleUserIdChange={handleUserIdChange}
          handleUserAddClick={handleUserAddClick}
        />
      </div>
      <div class="sleads-area">
        <svg data-testid="DeleteIcon"></svg>

        {sleads.map((slead) => (
          <BasicCard key={slead.id} title={slead.id} body={slead.body} />
        ))}
      </div>
    </>
  );
};
