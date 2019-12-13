const message = require("../functions/message");

module.exports = {
    go: (msg, rest) => {
        return;
        let idIndex = rest.indexOf("to") + 1;

        if (idIndex === 0) return;

        if (rest[idIndex] === "the") idIndex ++;

        const name = rest.slice(0, rest.indexOf("to")).join(" ");

        if (rest[idIndex] === "adam") {
            const previous = config.adamSandlerList;
            previous.push(name);
            updateList("adamSandlerList", previous);
            message.send(channel, "Added " + name + " to the Adam Sandler List. His days are numbered.");
        }

        if (rest[idIndex] === "fuck") {
            if (!config.approvedFuckListers.includes(msg.member.id)) {
                message.send(channel, "That's too much power for one man, and that's why I gave it to Josh.");
                lastCommand = "none";
                return;
            }
            const previous = config.fuckList;
            previous.push(name);
            updateList("fuckList", previous);
            message.send(channel, `Added ${name} to the fuck list.`);
        }
    }
};