const colors = require("jbassard97nodecolors");
const { RainbowText, BrightGreenText, BrightRedText } = colors;

const successLog = (text) => {
  console.log(BrightGreenText(text));
};

const failureLog = (text) => {
  console.log(BrightRedText(text));
};

const completeLog = (text) => {
  console.log(RainbowText(text));
};

module.exports = { successLog, failureLog, completeLog };
