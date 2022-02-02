import axios from 'axios';


const jenkinsAPI = axios.create({
  baseURL: `https://my-god.herokuapp.com`,
})

export default {
  async fetchUpdateStatus () {
    const res = await jenkinsAPI.get('/cc-update-staus');
    return res.data
  }
}