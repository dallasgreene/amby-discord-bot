const Discord = require("discord.js");
const client = new Discord.Client();
const configPath = "./config.json";
const config = require(configPath);
const fsProm = require("fs").promises
const token = require("./token_config.json");

function sendMessage(msg, text) {
    msg.channel.send(text)
    .then(botMsg => console.log(`Sent message: ${botMsg.content}`));
}

function updateList(field, newList) {
    let listString = "[";
    for (let name of newList) {
        listString += "\"" + name + "\", "
    }
    listString = listString.substring(0, listString.length - 2);
    listString += "]";
    fsProm.readFile(configPath, "utf8")
    .then(output => {
        const changeIndex = output.indexOf(field) + field.length + 3;
        const afterIndex = ((output.indexOf(",", changeIndex) === -1)
            ? output.length - 2 : output.indexOf(",", changeIndex));

        const before = output.substring(0, changeIndex);
        const after = output.substring(afterIndex);

        const newConfig = before + listString + after;
        console.log(`new config:\n${newConfig}`);
        fsProm.writeFile(configPath, newConfig);
    });
}

function toString(list) {
    let listString = "";
    for (let i = 0 ; i < list.length ; i ++) {
        listString += (i + 1).toString() + ". " + list[i] + "\n";
    }
    listString = listString.trim();
    return listString;
}

function spongeIt(message) {
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

let lastCommand = "none";

// start bot
client.on("ready", () => {
    console.log(`Ya boi ${client.user.tag} is in this bitch.`);
});

// checks every message sent to the server
client.on("message", msg => {

    // if the message is from a bot, ignore it
    if (msg.author.bot) return;

    if(msg.member.id === config.nate) {
        if (Math.random() < 0.01) {
            sendMessage(msg, "idiot.");
        }
        return;
    }

    if(msg.member.id === config.josh) {
        if (Math.random() < 0.01) {
            sendMessage(msg, "josh im ordering a pizza to your house what do you want?");
        }
        return;
    }

    // ignore any message that does not start with prefix in the configuration file.
    if (msg.content.substring(0, config.prefix.length) !== config.prefix) return;

    // array of everything after the prefix defined in the config
    const rest = msg.content.substring(config.prefix.length).trim().split(" ");

    // the command that was recieved by the bot, (also removes it from the array of everything after prefix)
    const command = rest.shift().toLowerCase();

    // debugging:
    console.log(`Set rest: \"${rest}\", length: ${rest.length}`);
    console.log(`Set command: \"${command}\"`);

    if (command === lastCommand) {
        sendMessage(msg, "alright whatever")
    }
    else if (Math.random() < 0.05) {
        const responsesList = config.genericResponses;
        const response = responsesList[Math.floor(Math.random() * responsesList.length)]
        sendMessage(msg, response);
        lastCommand = command;
        return;
    }

    if (command === "hey") {
        sendMessage(msg, "leave me alone.");
    }

    else if (command === "role") {
        if (rest.length === 2 && rest[0] === "color") {
            const color = rest[1];
            if (color.includes("#") && color.length === 7) {
                msg.member.colorRole.setColor(rest[0]);
            }
        }

        else if (rest[0] === "name") {
            const newName = rest.slice(1, rest.length).join(" ");
            msg.member.colorRole.setName(newName);
        }
    }

    else if (command === "emoji") {
        if (rest.length === 1) {
            const name = rest[0];
            msg.guild.createEmoji(msg.attachments.first().url, name);
        }
    }

    else if (command === "play") {
        const game = rest.join(" ");
        if (game.toLowerCase().includes("civ") || game.toLowerCase().includes("fallout")) {
            sendMessage(msg, "shut up oliver. " + game + " is a cool game but like, leave me alone.");
        }
        else {
            sendMessage(msg, "shut up oliver. " + game + " is stupid.");
        }
    }

    else if (command === "add") {
        idIndex = rest.indexOf("to") + 1;

        if (idIndex === 0) return;

        if (rest[idIndex] === "the") idIndex ++;

        const name = rest.slice(0, rest.indexOf("to")).join(" ");

        if (rest[idIndex] === "adam") {
            previous = config.adamSandlerList;
            previous.push(name);
            updateList("adamSandlerList", previous);
            sendMessage(msg, "Added " + name + " to the Adam Sandler List. His days are numbered.");
        }

        if (rest[idIndex] === "fuck") {
            if (!config.approvedFuckListers.includes(msg.member.id)) {
                sendMessage(msg, "That's too much power for one man, and that's why I gave it to Josh.");
                lastCommand = "none";
                return;
            }
            previous = config.fuckList;
            previous.push(name);
            updateList("fuckList", previous);
            sendMessage(msg, "Added " + name + " to the fuck list.");
        }
    }

    else if (command === "adam") {
        sendMessage(msg, toString(config.adamSandlerList));
    }

    else if (command === "fuck") {
        sendMessage(msg, toString(config.fuckList));
    }

    else {
        lastCommand = "none";
        const response = spongeIt(msg.content.substring(config.prefix.length)) + " thats not even a thing dumb dumb";
        sendMessage(msg, response);
        return;
    }
});

client.login(token.token);
