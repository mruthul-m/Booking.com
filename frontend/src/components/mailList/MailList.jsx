import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="title">Save time, save money!</h1>
      <p className="mailSubTitle">
        Sign up and we'll send the best deals to you
      </p>
      <div className="mailInputContainer">
        <input type="email" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default MailList;
