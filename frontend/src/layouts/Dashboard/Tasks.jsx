import React, { Fragment } from "react";
import { getPosts, deletePost, setCurrent } from "../../actions/posts";
import { connect } from "react-redux";
import { useEffect } from "react";
import TaskItems from "./TaskItems";
import NightSkySvg from "../../assets/NightSky.svg";
import { BiTask } from "react-icons/bi";

const Tasks = ({
  getPosts,
  posts,
  imageName,
  deletePost,
  setCurrent,
  user,
  post: { loading },
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      {posts.length === 0 ? (
        <div style={styledDiv}>
          <h2>No Tasks Yet</h2>
          <BiTask size={30} color="#3C16F7" />
          <img style={svg} src={NightSkySvg} alt="svg-sky" />
          <div>
            <p>
              Start Adding some Tasks{" "}
              <strong>{user !== null && user.name.toUpperCase()}</strong>
            </p>
          </div>
        </div>
      ) : (
        posts.map((poster) => (
          <TaskItems
            key={poster._id}
            deletePost={deletePost}
            image={imageName}
            poster={poster}
            setCurrent={setCurrent}
            getPosts={getPosts}
            user={user}
            loading={loading}
          />
        ))
      )}
    </Fragment>
  );
};

const styledDiv = {
  width: "90%",
  margin: "auto",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
};
const svg = {
  width: "40%",
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts, deletePost, setCurrent })(
  Tasks
);
