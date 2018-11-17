import {RichEmbed} from 'discord.js';

class Commands {
    constructor() {
    }

    /**
     * Formats a number to 2 decimal points
     * @param  {Number} number The number to format
     * @return {Number}
     */
    formatNumberDecimal(number) {
        return Math.max(0, Math.round(number * 100) / 100);
    }

    /**
     * Generates a random value between min and max
     * @param  {Number} min
     * @param  {Number} max
     * @return {Number}
     */
    between(min, max) {
        min = parseInt(min, 10);
        max = parseInt(max, 10);

        if (isNaN(min) || isNaN(max)) {
            return 0;
        }

        return Math.floor(
            (Math.random() * (
                Math.max(min, max) - Math.min(min, max)
            )) + Math.min(min, max)
        );
    }

    parse = (message) => {
        // Dice roll
        // /roll 2d4
        if (message.content.indexOf('/roll') === 0) {
            this.cmdDice(message);
            return;
        }
    }

    cmdDice(message) {
        const errorMsg = 'The command is: `/roll xdy` or `/roll x d y`, where x is the number of dies to roll, and y being the type of die. Eg: `/roll 4d6`';
        let rollString = message.content.trim().toLowerCase();

        if (rollString === '/roll') {
            message.reply(errorMsg);
            return;
        }

        // remove the /roll prefix
        rollString = rollString.replace('/roll ', '');
        // remove the spaces as they are not needed
        rollString = rollString.replace(/\s/, '');

        // split the roll params
        let params = rollString.split('d');

        if (params.length !== 2) {
            message.reply(errorMsg);
            return;
        }

        let diceCount = parseInt(params[0], 10);
        let diceType = parseInt(params[1], 10);

        if (isNaN(diceCount) || isNaN(diceType)) {
            message.reply('You must specify a valid and positive number for the number of dies and the type of die.');
            return;
        }

        if (diceCount < 1 || diceCount > 100) {
            message.reply('You can roll 1-100 dies at the same time.');
            return;
        }

        if (diceType < 1 || diceType > 10000) {
            message.reply('The die types you can roll is 1-10000.');
            return;
        }

        let numberResult = 0;
        for (var i = diceCount; i > 0; i--) {
            numberResult += this.between(1, diceType);
        }

        const result = this.formatNumberDecimal(numberResult);

        const rollResults = new RichEmbed()
            // Set the title of the field
            .setTitle(`:game_die: Rolling ${diceCount}D${diceType}:`)
            // Set the color of the embed
            .setColor(0xFF0000)
            // Set the main content of the embed
            .setDescription(`Result: ${result}`);

        // Send the embed to the same channel as the message
        message.channel.send(rollResults);
    }
}

export default Commands;
