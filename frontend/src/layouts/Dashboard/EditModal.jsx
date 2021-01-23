import React, { useState, Fragment, useRef } from "react";
import { editPost, getPosts } from "../../actions/posts";
import { connect } from "react-redux";
import { useEffect } from "react";
import { setCurrent } from "../../actions/posts";
import { useDetectOutsideClick } from "../../assets/outsideClick/UseOutsideClick";
import { FiEdit3 } from "react-icons/fi";

const EditModal = ({ post: { current }, poster, setCurrent, editPost }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const [text, setText] = useState("");

  useEffect(() => {
    if (current) {
      setText(current.text);
    }
  }, [current]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      return alert("Text is Empty!");
    }
    if (current !== null) {
      const updatedTask = {
        _id: current._id,
        text,
      };
      editPost(updatedTask);
    }
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Fragment>
      <div>
        <div className="menu-container">
          <button
            onClick={onClick}
            style={{ outline: "none" }}
            className="menu-trigger"
          >
            <FiEdit3 size={16} />
          </button>

          <div
            style={{
              zIndex: "800",
              maxWidth: "350px",
              height: "140px",
              marginLeft: "125px",
            }}
            className="dropdown"
            onMouseLeave={onClick}
            ref={dropdownRef}
            className={`dropdown-menu ${isActive ? "active" : "inactive"}`}
          >
            <form
              style={{ padding: "8px", margin: "auto", zIndex: "800" }}
              onSubmit={onSubmit}
            >
              <div style={{ margin: "8px" }}>
                <label htmlFor="edit">Edit Task</label>
                <input
                  style={styledInput}
                  placeholder="Edit Task ..."
                  type="text"
                  name="text"
                  value={text}
                  onChange={onChange}
                />
                <button style={styledBtn} type="submit">
                  Update
                </button>
                <button onClick={() => setCurrent(poster)} style={styledEdit}>
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const styledInput = {
  padding: "12px",
  border: "1px solid #40E648",
  borderRadius: "5px",
  margin: "auto",
  width: "90%",
};
const styledBtn = {
  padding: "12px",
  background: "#40E649",
  border: "none",
  borderRadius: "2px",
  fontSize: "14px",
  cursor: "pointer",
  margin: "12px 0px",
};
const styledEdit = {
  padding: "12px",
  background: "#87FDFF",
  border: "none",
  borderRadius: "2px",
  fontSize: "14px",
  cursor: "pointer",
  margin: "12px 0px",
  float: "right",
  outline: "none",
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { editPost, getPosts, setCurrent })(
  EditModal
);
