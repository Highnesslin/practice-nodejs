const axios = require('axios');

const config = {
  client_id: '924b0f275b200b1aed50',
  client_secret: '44f1d332e370b0aa6ea897883bd00947fceefed7',
};

module.exports = {
  reqGithubUser: token =>
    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${token}`,
      },
    }),
  reqGithubToken: code =>
    axios.post('https://github.com/login/oauth/access_token', { ...config, code }),
};
