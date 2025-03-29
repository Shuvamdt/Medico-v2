import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const name = params.get("name");

    if (userId) {
      props.setUserId(userId);
      props.setLogStatus(true);
      localStorage.setItem("userId", userId);
      localStorage.setItem("logStatus", true);
      alert(`Welcome, ${name}!`);
      navigate("/");
    } else {
      navigate("/");
    }
  }, [props, navigate]);

  return <div>Logging you in...</div>;
};

export default AuthSuccess;
