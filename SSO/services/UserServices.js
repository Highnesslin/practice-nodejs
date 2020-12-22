const fs = require('fs');
const path = require('path');

const file = path.resolve('./services/store.json');

const getUserInfoById = id => {
  let store = fs.readFileSync(file);
  store = JSON.parse(store);

  return store ? store[id] : null;
};

const saveUserInfo = ({ userId, username, password }) => {
  fs.writeFileSync(
    file,
    JSON.stringify({
      [userId]: {
        userId,
        username,
        password,
      },
    })
  );
};

module.exports = {
  getUserInfoById,
  saveUserInfo,
};
