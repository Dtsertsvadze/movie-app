import classes from "../styles/footer.module.css";
import React from "react";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.box}>
          <div>FAQ</div>
          <div>Investor Relations</div>
          <div>Corporate Information</div>
          <div>Ways to Watch</div>
          <div>Netflix Originals</div>
          <div>
            <select className={classes.select} name="language">
              <option value="english">English</option>
              <option value="german">German</option>
              <option value="georgian">Georgian</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>
        </div>
        <div className={classes.box}>
          <div>Help</div>
          <div>Jobs</div>
          <div>Terms of Use</div>
          <div>Contact Us</div>
        </div>
        <div className={classes.box}>
          <div>Account</div>
          <div>Redeem Gift Cards</div>
          <div>Privacy</div>
          <div>Speed Test</div>
        </div>
        <div className={classes.box}>
          <div>Media Center</div>
          <div>Buy Gift Cards</div>
          <div>Cookie Preferences</div>
          <div>Legal Notices</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
