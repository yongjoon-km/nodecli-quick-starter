import axios from "axios";

async function fetchDependencies() {
  const response = await axios.get(`https://start.spring.io/dependencies`);
  return response.data.dependencies;
}

export default fetchDependencies;
