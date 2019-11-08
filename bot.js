const Discord = require("discord.js");
const client = new Discord.Client();
const configPath = "./config.json";
const config = require(configPath);
const fsProm = require("fs").promises;
const token = require("./token_config.json");
const message = require("./functions/message");
const commandList = require("./commands/commandList");

const updateList = (field, newList) => {
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
};

const toString = list => {
    let listString = "";
    for (let i = 0 ; i < list.length ; i ++) {
        listString += (i + 1).toString() + ". " + list[i] + "\n";
    }
    listString = listString.trim();
    return listString;
};

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
            message.send(msg, "idiot.");
        }
        return;
    }

    if(msg.member.id === config.josh) {
        if (Math.random() < 0.01) {
            message.send(msg, "josh im ordering a pizza to your house what do you want?");
        }
        return;
    }

    // ignore any message that does not start with prefix in the configuration file.
    if (msg.content.substring(0, config.prefix.length) !== config.prefix) return;

    // array of everything after the prefix defined in the config
    const rest = msg.content.substring(config.prefix.length).trim().split(" ");

    // the command that was received by the bot, (also removes it from the array of everything after prefix)
    const command = rest.shift().toLowerCase();

    // debugging:
    console.log(`Set rest: \"${rest}\", length: ${rest.length}`);
    console.log(`Set command: \"${command}\"`);

    if (command === lastCommand) {
        message.send(msg.channel, "alright whatever");
    }
    else if (Math.random() < 0.05) {
        const responsesList = config.genericResponses;
        const response = responsesList[Math.floor(Math.random() * responsesList.length)];
        message.send(msg.channel, response);
        lastCommand = command;
        return;
    }
    else {
        lastCommand = "none";
    }

    try {
        commandList[command](msg, rest);
    } catch(TypeError) {
        lastCommand = "none";
        const response = message.spongeIt(msg.content.substring(config.prefix.length)) + " thats not even a thing dumb dumb";
        message.send(msg.channel, response);
    }
    return;

    if (command === "adam") {
        message.send(msg.channel, toString(config.adamSandlerList));
    }

    else if (command === "fuck") {
        message.send(msg.channel, toString(config.fuckList));
    }
});

client.login(token.token);
