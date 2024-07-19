import { useLocation, useNavigate } from 'react-router-dom';

const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParam = (param) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(param);
  };

  const setQueryParam = (param, value) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set(param, value);
    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  const removeQueryParam = (param) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete(param);
    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  return {
    getQueryParam,
    setQueryParam,
    removeQueryParam,
  };
};

export default useQueryParams;