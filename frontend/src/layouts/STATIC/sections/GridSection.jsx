import React from "react";
import "../scss/Layout_section.scss";
import Svg from "../../../assets/Notes.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const GridSection = ({ section }) => {
  return (
    <div>
      {section.map((sec) => (
        <div className="layout_wrapper">
          <motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.8 }}>
            <div className="grid_layout">
              <div key={sec.id} className="layout_section">
                <h1>{sec.title}</h1>
                <p>{sec.paragraph}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Get Started
                  </Link>
                </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.88 }}
              >
                <img src={Svg} alt="svg" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default GridSection;
