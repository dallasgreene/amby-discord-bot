const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./configuration/config.json");
const responses = require("./configuration/responses.json");
const token = require("./configuration/token_config.json").token;
const message = require("./src/util/message");
const commandList = require("./src/controllers/commands/commandList");

let lastCommand = "none";

let grindingId = null;

// start bot
client.on("ready", () => {
    console.log(`Ya boi ${client.user.tag} is in this bitch.`);
});

// checks every message sent to the server
client.on("message", msg => {

    // if the message is from a bot, ignore it
    if (msg.author.bot) return;

    const memedOn = require("./src/controllers/memedOn")(msg);
    if (memedOn) return;

    // ignore any message that does not start with prefix in the configuration file.
    if (msg.content.substring(0, config.prefix.length) !== config.prefix) return;

    // array of everything after the prefix defined in the config
    const rest = msg.content.substring(config.prefix.length).trim().split(" ");

    // the command that was received by the bot, (also removes it from the array of everything after prefix)
    const command = rest.shift().toLowerCase();

    // debugging:
    console.log(`Set rest: \"${rest}\", length: ${rest.length}`);
    console.log(`Set command: \"${command}\"`);

    // theres a chance that Amby just doesn't do what you tell them to
    if (command === lastCommand) {
        message.send(msg.channel, "alright whatever");
    }
    else if (Math.random() < 0.05) {
        const responsesList = responses.generic;
        const response = responsesList[Math.floor(Math.random() * responsesList.length)];
        message.send(msg.channel, response);
        lastCommand = command;
        return;
    }

    lastCommand = "none";  // reset last command

    // extra stuff for the grind command, will eventually be removed
    let commandResponse;
    if (command === "grind" && grindingId !== null) return;
    if (command === "stop" && grindingId !== null) {
        clearInterval(grindingId);
        grindingId = null;
        return;
    }

    // check if command is recognized, and if so, call it
    if (commandList.hasOwnProperty(command)) {
        try {
            commandResponse = commandList[command].go(msg, rest);
        } catch (TypeError) {
            message.send(msg.channel, "There's been an error. Fix ur shit :b:allas");
        }
    } else {
        const response = `${message.spongeIt(msg.content.substring(config.prefix.length))} thats not even a thing dumb dumb`;
        message.send(msg.channel, response);
    }

    // more extra stuff for the grind command
    if (command === "grind" && commandResponse) {
        grindingId = commandResponse;
    }
});

client.login(token);
