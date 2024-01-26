import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [detail, setDetail] = useState<null | string>(null);
  const getUserName = async () => {
    try {
      const res = await axios.get("/api/users/me");
      //console.log(res.data);
      setDetail(res.data.data.username);
    } catch (error: any) {
      //console.error(error.message);
      setDetail(`Something went wrong. ${error.message}`)
    }
  };
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getUserName();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return detail;
};
