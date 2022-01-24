import React, { useEffect } from "react";
import styles from "./BgRemove.module.scss";

import bgImg from "../../../assets/images/bgRemove.png";
import { GlobalContext } from "../../../context/GlobalState";

const BgRemove = () => {
  const { disableNavbar } = React.useContext(GlobalContext);

  useEffect(() => {
    disableNavbar(true);
  }, []);

  let imgURL =
    "https://media.istockphoto.com/photos/mature-woman-with-beach-hat-and-sunglasses-picture-id1137373616?k=20&m=1137373616&s=612x612&w=0&h=zYyuzYZ93h_PQVCQAc0-ePUYWZ8BNZObsnNrwf3mRNQ=";

  return (
    <div className={styles.container}>
      <div className={styles.loginLeft}>
        <div className={styles.leftContainer}>
          <div className={styles.header}>Remove image background</div>
          <div className={styles.text}>100% automatic and free</div>
          <div className={styles.imgContainer}>
            <img src={imgURL} alt="image" />
          </div>
        </div>
      </div>
      <div className={styles.loginRight}>
        <div className={styles.form}>
          <img src={bgImg} style={{ marginBottom: "2.5rem" }} />
          <span className={styles.textTop}>
            File should be png, jpg and
            <br />
            less than 5mb
          </span>
          <br />
          <button className={styles.formButton}>Upload Image →</button>
          <br />
          <span className={styles.drop}>Or drop a file</span>
        </div>
      </div>
    </div>
  );
};

export default BgRemove;
