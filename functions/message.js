module.exports = {
    send: (channel, text) => {
        channel.send(text)
            .then(botMsg => console.log(`Sent message: ${botMsg.content}`));
    },
    spongeIt: message => {
        message = message.toLowerCase();
        let newMsg = "";
        let lowercase = false;
        for (let i = 0 ; i < message.length ; i ++) {
            const char = message.substring(i, (i + 1));
            if (char === " ") {
                newMsg += char;
            }
            else {
                const rand = Math.random();
                if ((lowercase && rand < 0.9) || (!lowercase && rand >= 0.9)) {
                    newMsg += char.toUpperCase();
                }
                else if ((!lowercase && rand < 0.9) || (lowercase && rand >= 0.9)){
                    newMsg += char.toLowerCase();
                }
                lowercase = !lowercase;
            }
        }
        return newMsg;
    }
};