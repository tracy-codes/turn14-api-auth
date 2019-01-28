const axios = require("axios");

async function getAuthToken(client_id, client_secret) {
  try {
    const tokenRequest = await axios.request({
      url: "/token",
      method: "post",
      baseURL: "https://api.turn14.com/v1",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        grant_type: "client_credentials",
        client_id,
        client_secret
      }
    });
    return tokenRequest.data.access_token;
  } catch (error) {
    return error.message;
  }
}

module.exports = getAuthToken;
