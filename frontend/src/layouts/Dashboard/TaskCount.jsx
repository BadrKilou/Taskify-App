import React from "react";
import { useSelector } from "react-redux";

export const TaskCount = () => {
  const post = useSelector((state) => state.post);
  const { posts } = post;
  //   console.log(posts);
  return (
    <div style={{ textAlign: "center" }}>
      {posts.length > 1 ? (
        <h2>
          <p>
            You have {posts.length} <strong style={color}>Tasks</strong>
          </p>
        </h2>
      ) : (
        <h2>
          <p>
            You have {posts.length} <strong style={color}>Task</strong>
          </p>
        </h2>
      )}
    </div>
  );
};

const color = {
  color: "#6464E8",
};
