import axios from "axios";

const jenkinsAPI = axios.create({
  baseURL: `https://my-god-render.onrender.com`,
});

async function fetchUpdateStatus(params) {
  try {
    const res = await jenkinsAPI.get("/cc-update-staus", {
      params,
    });
    return res.data;
  } catch (e) {
    return await fetchUpdateStatus(params);
  }
}

export default {
  fetchUpdateStatus,
};
