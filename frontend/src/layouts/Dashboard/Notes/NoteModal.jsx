import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { addPosts } from "../../../actions/posts";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

const NoteModal = ({ show, closeModal, addPosts }) => {
  const [text, setText] = useState("");

  const { addToast } = useToasts();

  // const handleWordCount = (event) => {
  //   const charCount = event.target.value.length;
  //   const charLeft = 5 - charCount;
  //   setChars_min(charLeft);
  //   console.log(charLeft);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      return alert("Post is Empty");
    } else {
      const newPost = {
        text,
      };
      addPosts(newPost);
      addToast("Note Added Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      setText("");
    }
  };
  return (
    <Fragment>
      <div
        className="modal-wrapper"
        style={{
          opacity: show ? "1" : "0",
          transform: show ? "translateY(-38vh)" : "translateY(-180vh)",
        }}
      >
        <div className="modal-header">
          <span onClick={closeModal} className="close-modal-btn">
            x
          </span>
        </div>
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div class="ui-input-container">
              <h2>Add a New Task</h2>
              <label class="ui-form-input-container">
                <textarea
                  class="ui-form-input"
                  id="word-count-input"
                  onChange={(e) => setText(e.target.value)}
                  name="post"
                  value={text}
                />
                <span class="form-input-label">Task</span>
              </label>
              <p aria-live="polite">
                <strong>
                  <span id="word-count">0</span> words
                </strong>{" "}
                |{" "}
                <strong>
                  <span id="character-count">{text.length}</span> characters
                </strong>
                .
              </p>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn-cancel">
                Submit Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { addPosts })(NoteModal);
