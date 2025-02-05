import { useEffect, useState } from "react";

const useDetectFirstRender = () => {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return firstRender;
};

export default useDetectFirstRender;
