**Amby Discord Bot**
--
This is a [Discord](https://discord.com/) bot for the Planescape server.

Currently it doesn't do a whole lot, because basically every time I learn more about development
I come back to this bot and I try to refactor things to be better. So what ends up happening is
I spend tons of time refactoring and very little time implementing new features.

**Setup**
--
To run Amby, you will need a [discord account](https://discord.com/developers/applications),
a Discord server you created/manage that you would like to add amby to, and the latest version of
both [node](https://nodejs.org/en/) and [docker desktop](https://www.docker.com/get-started).

#### Create an Application and Add It to Your Server
*This is how the code here is connected to discord so users can interact with it*
1. Go to [discord's developer portal](https://discord.com/developers/applications) and create a
    new application for this bot (maybe call it "Amby").
2. After you create the bot, click "Bot" in the settings menu on the left part of the screen and
    click "Click to Reveal Token"
3. In the `configuration/` directory of this repo, create a file called `token_config` which
    contains only the token from step 2.
4. Go back to the developer portal and click "OAuth2" in the settings menu on the left.
5. Under "scopes" (the first big list of checkboxes), check "bot" (it should be in the middle-ish)
    and then copy the link that pops up and paste it into a new tab in your browser.
6. It'll give you a dropdown too add the bot to a server, chose a server and click "authorize"
    at the bottom.

#### Run the Bot
1. Open a terminal and navigate to the root of this repo. (Run all commands from the repo root).
2. (First time only): Run `sh db/create_docker_db.sh [username] [password]` to create the container
    for the db.
    1. This will create and start the database that Amby uses.
    2. In the future, run `docker start amby-db` and `docker stop amby-db` to start and stop the db.
3. Run `npm run build-start -- [username] [password]` to run the bot.
    1. This must be the same username and password that you provided in step 3 of creating
        the database.
4. Open Discord, go to the server you added Amby to, and try typing `!hey`, Amby should respond.

Database credentials are required for these commands because this way they never need to be stored
anywhere and will never appear in the source code of the bot. That's as secure as I know how to be.

**Contributing**
--
If you would like to add something to Amby, message me (Dallas, dgreene1641@gmail.com) and I'll add
you as a contributor. If you really want to you can also fork this and do whatever you want with it.
 
#### To Add a New Command
1. Create a file for it:
    `src/controllers/commands/[appropriate category folder]/[name of command]Command.js`
2. Implement your command as a class which extends `src/definitions/Command.js`.
    1. Its constructor should take only one argument of type `src/models/CommandService.js`, and
        this should be the first argument to the `super` call in the constructor. The rest of the
        arguments to the super call are strings which you should write.
    2. The `go` method should be overwritten. See its declaration in `src/definitions/Command.js`
        for details on how to use it.
    3. If your command needs to make a call to the model/database, use `this.commandService`.
    4. Your class should be the default export of your file.
3. Add your command to `src/controllers/commands/availableCommands.js`.
    1. Import it at the top and then add it to the array.
    
#### To Add an Alias for an Existing Command
*For example:* `help` *is an alias for* `commands`, *they are just two different names for the same
command*
1. Modify the `JSONMapping` in `src/controllers/commands/commandAliasMapping.js`.
    Details are in comments of the file.
    
#### To Add a Collection to the Database
(TODO)

