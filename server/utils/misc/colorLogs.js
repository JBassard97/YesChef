const colors = require("jbassard97nodecolors");
const { RainbowText, BrightRedText } = colors;

const failureLog = (text) => {
  console.log(BrightRedText(text));
};

const completeLog = (text) => {
  console.log(RainbowText(text));
};

module.exports = { failureLog, completeLog };
