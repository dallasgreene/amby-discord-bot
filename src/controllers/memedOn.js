const memberSnowflakes = require("../../configuration/memberSnowflakes.json");
const responses = require("../../configuration/responses.json");

const memedOn = (msg) => {
    // if msg author is one of the boys, theres a 0.5% chance they get memed on
    if (memberSnowflakes.hasOwnProperty(msg.member.id) && Math.random() < 0.005) {
        const responseArray = responses[memberSnowflakes[msg.member.id]];
        message.send(msg.channel, responseArray[Math.floor(Math.random() * responseArray.length)]);
        return true;
    } else {
        return false;
    }
};

module.exports = memedOn;