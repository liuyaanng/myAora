import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const fetchData = async () => {
    setisLoading(true);
    try {
      const result = await fn();
      if (result) setData(result);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
