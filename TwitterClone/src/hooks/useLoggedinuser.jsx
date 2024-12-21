import { useEffect, useState } from "react";
import { useUserAuth } from "../context/useUserAuth";

const useLoggedinuser = () => {
  const { user } = useUserAuth();
  const email = user?.email;
  const [loggedinuser, setLoggedinuser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/loggedinuser?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setLoggedinuser(data);
      });
  }, [email, loggedinuser]);
  return [loggedinuser, setLoggedinuser];
};


export default useLoggedinuser;
