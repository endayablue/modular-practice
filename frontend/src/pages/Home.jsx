import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import calculateAge from "../Middlewares/calculateAge";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState(null); // Initialize age state

  useEffect(() => {
    const verifyCookie = async () => {
      const token = cookies.token;
      if (!token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user, birthday, height, weight, firstName, lastName } = data;
      setUsername(user);
      setFirstname(firstName);
      setLastname(lastName);
      setBirthday(birthday);
      setHeight(height);
      setWeight(weight);
      
      // Calculate and set the age when birthday changes
      if (birthday) {
        const calculatedAge = calculateAge(birthday);
        setAge(calculatedAge);
      }
      
      if (status) {
        toast(`Hello ${user}`, {
          position: "top-right",
          toastId: "hello",
        });
      } else {
        setCookies({ token: "" });
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, setCookies, birthday]);

  const Logout = () => {
    setCookies({ token: "" });
    navigate("/signup");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{firstName} {lastName}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
        <span>username: {username}</span>
        <span>Height: {height}cm</span>
        <span>Weight: {weight}kg</span>
        {age !== null && <span>Age: {age} years</span>} {/* Display age when available */}
      </div>
    </>
  );
};

export default Home;
