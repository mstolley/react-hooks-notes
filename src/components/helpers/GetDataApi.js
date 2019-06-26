import {
  useState,
  useEffect
} from 'react';
import axios from 'axios';

const GetDataApi = () => {
  const [data, setData] = useState({});
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        if (!!url && url.length > 0) {
          const result = await axios(url);
          setData(result.data);
        }
      } catch (error) {
        setIsError(true);
        console.log('error: ', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default GetDataApi;
