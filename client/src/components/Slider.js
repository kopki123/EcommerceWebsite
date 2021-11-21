import React, { useState, useEffect } from "react";
import "./Slider.css";

const data = [
  {
    id: 1,
    img: "https://res.cloudinary.com/devkewe0j/image/upload/v1637316723/fashion-clothes_ZN97ZIF3ZU_q1uxpm.jpg",
    title: "夏季特賣",
    desc: "滿799折100",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/devkewe0j/image/upload/v1637316724/clothing-top_TEFSYENORD_x5po8r.jpg",
    title: "秋季特賣",
    desc: "全館全面7折",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/devkewe0j/image/upload/v1637316720/clothes-shirts_BD2F94946C_wvvu9q.jpg",
    title: "冬季特賣",
    desc: "新品全面9折",
  },
];

const Slider = () => {
  const [slider, setSlider] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = slider.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, slider]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className="slider">
      <div className="wrapper">
        {slider.map((person, personIndex) => {
          const { id, img, title, desc } = person;
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === slider.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img src={img} alt="" />
              <div className="content">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Slider;
