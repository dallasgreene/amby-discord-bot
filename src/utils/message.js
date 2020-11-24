const send = (channel, text) => {
  channel.send(text)
    .then((botMsg) => console.log(`Sent message: ${botMsg.content}`));
};

const spongeIt = (originalMessage) => {
  const message = originalMessage.toLowerCase();
  console.log(message);
  let newMsg = '';
  let lowercase = false;
  for (let i = 0; i < message.length; i += 1) {
    const char = message.substring(i, (i + 1));
    if (char === ' ') {
      newMsg += char;
    } else {
      const rand = Math.random();
      if ((lowercase && rand < 0.9) || (!lowercase && rand >= 0.9)) {
        newMsg += char.toUpperCase();
      } else if ((!lowercase && rand < 0.9) || (lowercase && rand >= 0.9)) {
        newMsg += char.toLowerCase();
      }
      lowercase = !lowercase;
    }
  }
  return newMsg;
};

const message = {
  send,
  spongeIt,
};

export { send, spongeIt };
export default message;
