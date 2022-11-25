import React from "react";
import "./Points.css";
import { motion } from "framer-motion";
import { useState } from "react";

const Points = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="PointsFun">
      <div className="cards">
        <motion.div
          transition={{ layout: { duration: 1, type: "spring" } }}
          layout
          onClick={() => setIsOpen(!isOpen)}
          className="card"
          style={{
            borderRadius: "1rem",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5",
          }}
        >
          <motion.h2 layout="pos">
            <div className="feImdiv">
              <img
                className="feIm"
                src="https://img.freepik.com/free-vector/detailed-point-exchange-illustration_23-2148850435.jpg?w=2000"
              />
            </div>
          </motion.h2>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0 }}
              className="expand"
            >
              {/* <p>
                You have <b>{props.user.user_points}</b> points!
              </p> */}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Points;
