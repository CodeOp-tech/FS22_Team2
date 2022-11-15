import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PodiumStep({ podium, winner }) {
  const offset = podium.length - winner.position;

  return (
    <div>
      <h4>{winner.name}</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          placeContent: "center",
        }}
      >
        <motion.div
          style={{
            alignSelf: "center",
            marginBottom: ".99rem",
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: 1 + (offset + 2),
                duration: 0.75,
              },
            },
          }}
        >
          <img
            src={`https://i.pravatar.cc/64?u=${winner.id}`}
            alt=""
            style={{
              borderRadius: 9999,
              height: "2.75rem",
              overflow: "hidden",
              width: "2.75rem",
            }}
          />
        </motion.div>
        <motion.div
          style={{
            backgroundColor: "rgba(219,39,119,1)",
            borderColor: "rgba(190,24,93,1)",
            borderTopLeftRadius: ".5rem",
            borderTopRightRadius: ".5rem",
            display: "flex",
            filter: `opacity(${0.1 + offset / podium.length})`,
            marginBottom: -1,
            placeContent: "center",
            width: "10rem",
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { height: 0, opacity: 0 },
            visible: {
              height: 200 * (offset / podium.length),
              opacity: 1,
              transition: {
                delay: 1 + offset,
                duration: 2,
                ease: "backInOut",
              },
            },
          }}
        >
          <span style={{ alignSelf: "flex-end", color: "white" }}>
            {winner.position + 1}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
