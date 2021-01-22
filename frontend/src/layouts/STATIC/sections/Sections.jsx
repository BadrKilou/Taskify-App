import React from "react";
import { useState } from "react";
import GridSection from "./GridSection";
import Svg from "../../../assets/Notes.svg";

const Sections = () => {
  const [section] = useState([
    {
      id: 1,
      title: "Bring Emotion To Your Task",
      paragraph:
        "Sed in felis eu ligula fringilla ultricies non sed erat. Proin nec felis eget justo tincidunt sagittis non non elit. Morbi vel imperdiet libero, nec elementum elit. Mauris ac ligula id enim feugiat maximus eget sit amet tellus.",
      svg: `${Svg}`,
    },
  ]);
  return (
    <div>
      <GridSection section={section} />
    </div>
  );
};

export default Sections;
