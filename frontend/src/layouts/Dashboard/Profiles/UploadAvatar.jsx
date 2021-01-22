import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";

import "./styles/Avatar.scss";
import Button from "../../Button/Button";
import { useToasts } from "react-toast-notifications";

import { AiOutlineCloudUpload } from "react-icons/ai";

import Alert from "../../../assets/components/Alert";
import DeleteAvatar from "./DeleteAvatar";

const UploadAvatar = ({ deleteImage, photo: { imageName, _id }, addPhoto }) => {
  console.log(_id);

  const { addToast } = useToasts();

  const [file, setFile] = useState("");

  const [filename, setFilename] = useState({});
  const onChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (file === "") {
      addToast("Please include an image", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      addPhoto(file);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <Alert />
        <div class="avatar-upload">
          <div class="avatar-edit">
            <input
              type="file"
              id="imageUpload"
              onChange={onChange}
              accept=".png, .jpg, .jpeg"
            />
            <label for="imageUpload" onChange={onChange}>
              {" "}
              <MdAddAPhoto size={25} color={"#A9A9A9"} />
            </label>
          </div>
          <div class="avatar-preview">
            <img id="imagePreview" src={imageName} />
          </div>
          <pre style={{ marginTop: "15px" }}>
            <Button label={<AiOutlineCloudUpload size={32} />} />
          </pre>
        </div>
      </form>
      <DeleteAvatar deleteAvatar={deleteImage} id={_id} />
    </div>
  );
};

export default UploadAvatar;
