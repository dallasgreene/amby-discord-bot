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

#### Create the Database Amby Uses
1. Navigate to the `db/` directory of this project in the terminal.
2. Run `docker build . -t amby-mongo` to create the docker image for the database.
3. Run `sh create_docker_db.sh [username] [password]` to create the container for the db.
    1. This will also start the database.
    2. In the future, run `docker start amby-db` and `docker stop amby-db` to start and stop the db.

#### Run the Bot
1. Run `npm run start -- [username] [password]`.
    1. This must be the same username and password that you provided in step 3 of creating
       the database.
    2. If it's not working make sure you're running the command from the root of the repo.
2. Open Discord, go to the server you added Amby to, and try typing `!hey`, Amby should respond.

Database credentials are required for these commands because this way they never need to be stored
anywhere and will never appear in the source code of the bot. That's as secure as I know how to be.

**Contributing**
--
Idk why anyone would want to work on this but at some point I'll write out this section with
some macro on how the code is structured so you can figure out whats going on.
