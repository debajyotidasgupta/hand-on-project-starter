import { React } from "react";
import propTypes from "prop-types";

import Card from "../../components/Card/Card";
import styles from "./Dashboard.module.scss";

const images = [
  "https://media.istockphoto.com/photos/mature-woman-with-beach-hat-and-sunglasses-picture-id1137373616?k=20&m=1137373616&s=612x612&w=0&h=zYyuzYZ93h_PQVCQAc0-ePUYWZ8BNZObsnNrwf3mRNQ=",
  "https://www.opus.software/wp-content/uploads/2020/09/Api-Gateway.jpg",
  "https://media.sproutsocial.com/uploads/2015/04/What-is-an-API.png",
  "https://www.gorges.us/images/google-fonts.png",
];

const dummies = (num) => {
  let data = [];
  for (let i = 0; i < num; i++) {
    data.push({
      key: i,
      image: images[i % images.length],
      title: "API Name",
      brief:
        "The description of the API in quick brief and we will truncate it here...",
    });
  }
  return data;
};

const Ad = ({ image, title, desc }) => {
  return (
    <div className={styles.ad}>
      <img className={styles.adImg} src={image} alt="ad" />
      <div className={styles.adContainer}>
        <div className={styles.adDesign}> </div>
        <div className={styles.adText}>
          <span className={styles.adTitle}>{title}</span>
          <span className={styles.adDesc}>{desc}</span>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>View App</button>
        </div>
      </div>
    </div>
  );
};

Ad.propTypes = {
  image: propTypes.string,
  title: propTypes.string,
  desc: propTypes.string,
};

const Dashboard = () => {
  return (
    <div className={styles.home}>
      <Ad
        image={images[0]}
        title="Background Image Remove"
        desc="100% automatic and free"
      />
      <span className={styles.title}>All APIs</span>
      <div className={styles.container}>
        {dummies(8).map((e) => (
          <Card key={e.key} image={e.image} title={e.title} brief={e.brief} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
