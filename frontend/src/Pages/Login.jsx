import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  // FYI:
  // to update state formData inside setFormData,
  // it is bad to call and change dormData directly,
  // we should use prevState, it means previous state of formData,
  // which start with {name: "",email: "",password: "",password2: "",}
  //  the reason is state is not the same as variable:
  //  variable update in compile time,
  //    EX: n-1; n-1; the second variable n is already 1 less, so same as n-2
  //  state update in run time, it only change after setState() like setFormData(),
  //    EX: n-1; n-1; the second state n is still the same value, so same as n-1
  // but prevState allow state to change like variable,
  //    EX: prevState => prevState - 1, prevState => prevState - 1, so same as prevState - 2

  // this setFormData add form target name to previous state
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
