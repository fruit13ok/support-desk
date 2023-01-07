import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>what do you need help with</h1>
        <p>please choose from the option below</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> create new ticket
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> view my ticket
      </Link>
    </>
  );
}

export default Home;
