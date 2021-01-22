import React, { Fragment, useState } from "react";

import EditModal from "./EditModal";

import { BiTimeFive } from "react-icons/bi";
import { FcDeleteRow } from "react-icons/fc";
import "./styles/TaskItems.scss";

const TaskItems = ({ poster, deletePost, getPosts }) => {
  const [remove, setRemove] = useState("");

  const removeItem = () => {
    if (remove) {
      return setRemove("Pay The way");
    }
  };

  return (
    <Fragment>
      <div className="main">
        <ul className="tasks">
          <EditModal poster={poster} />
          <li className="task green animated fadeInUp">
            <h3>{poster.text}</h3>
            <h4>{poster.name}</h4>
            <div className="task-infos">
              <p className="date">Posted on</p>
              <BiTimeFive size={15} />
              <small>{poster.datePost}</small>
              <p className="time" onClick={removeItem}>
                <FcDeleteRow onClick={() => deletePost(poster._id)} size={28} />
              </p>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default TaskItems;
