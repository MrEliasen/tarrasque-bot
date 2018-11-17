import dotenv from 'dotenv';
import Discord from 'discord.js';
import Commands from './commands';

if (process.env.NODE_ENV === 'development') {
    // load .env file
    const dotloaded = dotenv.config();
    if (dotloaded.error) {
        throw new Error(dotloaded.error);
    }
}

// Create the bot
const client = new Discord.Client();

// load out commands
const commands = new Commands();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', commands.parse);

client.login(process.env.DOKKU_DISCORD_TOKEN || process.env.DISCORD_TOKEN);

// To join the bot on a server, open in browser:
// https://discordapp.com/oauth2/authorize?client_id=xxxxxx&scope=bot