import axios from "axios";

function fetchSpringBootInstaller(springInitializerParam) {
  return axios({
    method: "GET",
    url: `https://start.spring.io/starter.zip`,
    params: springInitializerParam,
    responseType: "stream",
  });
}

export default fetchSpringBootInstaller;
