import axios from "axios";

const instance = axios.create({
  baseURL = '.....' //CLOUD FUNCTION URL

})

export default instance;