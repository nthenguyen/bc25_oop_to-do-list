const URL_API = "https://62776dc508221c968464eca2.mockapi.io/";

class Services {
  callApi(uri, method, data) {
    return axios({
      url: URL_API + uri,
      method: method,
      data: data,
    });
  }
}

export default Services;
