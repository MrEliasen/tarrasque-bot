import dotenv from 'dotenv';
import Discord from 'discord.js';
import Commands from './commands';

// only load .env file in development.
// env config is set in dokku on live
if (process.env.NODE_ENV === 'development') {
    const dotloaded = dotenv.config();
    if (dotloaded.error) {
        throw new Error(dotloaded.error);
    }
}

// Create the bot
const client = new Discord.Client();

// load out commands
const commands = new Commands();

// Console log the client user when its logged in
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// hand off messages on discord to the parser
client.on('message', commands.parse);

// login to discord.
client.login(process.env.DOKKU_DISCORD_TOKEN || process.env.DISCORD_TOKEN);

// To join the bot on a server, open in browser:
// https://discordapp.com/oauth2/authorize?client_id=xxxxxx&scope=bot