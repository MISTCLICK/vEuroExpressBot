# vEuroExpressBot
A discord bot for handling operations and user synchronization in EuroExpress Virtual Airline Community Discord Server.
If you would like to run this bot on your server please read the LICENSE carefully and then follow the manual below.

First of all, Node.js, Discord.js, Discord.js/commando, git and Axios are required to operate.
This means that your system needs 2 things: a code editor and Node.js of the either LTS or NEWEST version (only v12+).
You can find Node.js here: https://nodejs.org/en/

After you have extracted files to any location and installed Node.js open any form of a console/terminal and point it to the folder with the bot with the `cd` command.
Then type `npm i` to install all the packages that the bot needs (discord.js, discord.js/Commando, git and axios).

Then it is your job to edit the code for it to suit your server (mostly texts and images). There are too many files to be edited, so we can't quite tell you which exact ones you need. Editing of the files - that is what you need the text editor for.

When you're done, create a discord application in the developer portal and invite the bot to your server using the `Oauth2 link generator` with ADMINISTRATOR permissions. Once that is done, create a file with a name `config.json` in the bot's root folder with the following code:

```json
{
    "prefix": "YOUR PREFIX HERE",
    "token": "YOUR BOT TOKEN HERE"
}
```

To run the bot, simply type `node index.js` in the terminal/console pointed at the bot folder with `cd` command.

Now, you're done! Don't forget to follow the license properly and enjoy using the bot.
