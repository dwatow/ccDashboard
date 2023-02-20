import axios from "axios";

const jenkinsAPI = axios.create({
  baseURL: `my-god.cyclic.app`,
  // baseURL: `http://localhost:3030`,
});

async function fetchUpdateStatus(params) {
  try {
    const res = await jenkinsAPI.get("/cc-update-staus", {
      params,
    });
    return res.data;
  } catch (e) {
    return {
      isSync: 1
    };
  }
}

export default {
  fetchUpdateStatus,
};
