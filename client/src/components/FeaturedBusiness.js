import React from "react";
import "./FeaturedBusiness.css";
import { motion } from "framer-motion";
import { useState } from "react";

const FeaturedBusiness = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="FeaturedBusiness">
      <div className="aweBlock">
        <h1 className="awesome">Awesome Shops This...</h1>
        <p className="para">Check out these great shops ...</p>
      </div>
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
          <motion.h2 layout="position">
            <h2>Laser</h2>
            <div className="featImg">
              <img src="https://cdn.shopify.com/s/files/1/0449/4613/files/5_064da9be-c43a-48f5-9a11-f175a1e46095_grande.JPG?v=1552569309" />
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
              <p>
                We try to convey with each collection all these local concepts
                that may seem invisible to any citizen.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
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
          <motion.h2 layout="position">
            <h2>Syra Coffee</h2>
            <div className="featImg">
              <img src="https://cdn.shopify.com/s/files/1/0299/2046/0884/files/gracia.png?v=1653134456" />
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
              <p>
                Syra Coffee no hubiera nacido sin la confluencia de innumerables
                influencias de todo el mundo. Estamos profundamente enamorados
                de nuestra Barcelona natal, donde reside la mezcla de raíces,
                culturas y tradiciones que nos define hoy
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
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
          <motion.h2 layout="position">
            <h2>Humana</h2>
            <div className="featImg">
              <img src="https://welovesecondhand.files.wordpress.com/2021/06/humana-moda-secondhand-vintage-segunda-mano-barcelona-general-alvarez-de-castro.jpg?w=676" />
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
              <p>
                Improve the living conditions of the most disadvantaged
                communities on the planet and facilitate their economic and
                social progress. Promote the circular economy.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedBusiness;
