import axios from "axios";

const jenkinsAPI = axios.create({
  baseURL: `https://my-god.herokuapp.com`,
  // baseURL: `https://a509-114-33-138-55.ngrok.io`,
});

export default {
  async fetchUpdateStatus(params) {
    const res = await jenkinsAPI.get("/cc-update-staus", {
      params,
    });
    return res.data;
  },
};
