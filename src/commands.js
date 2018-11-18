import {RichEmbed} from 'discord.js';

/**
 * The commands class
 */
class Commands {
    /**
     * Class constructor
     */
    constructor(client) {
        this.client = client;
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

    /**
     * Parses messages from discord
     * @param  {DiscordJS Message} message
     */
    parse = (message) => {
        // if we are testing, ignore messages from everyone but the user specified.
        if (process.env.NODE_ENV === 'development') {
            if (message.author.id !== process.env.DEVELOPER_ID) {
                return;
            }
        }

        const cmd = message.content.toLowerCase();

        switch (true) {
            case (cmd.indexOf('/roll ') === 0):
            case (cmd.indexOf('/dice ') === 0):
                this.cmdDice(message);
                return;

            case (['/surge', '/wildsurge', '/rollsurge'].includes(cmd)):
                this.cmdSurge(message);
                return;

            case (message.channel.type === 'dm' && cmd === 'help'):
                this.cmdHelp(message);
                return;
        }
    }

    cmdHelp(message) {
        const reply = `
**Dice Roll**
x is the number of dies to roll, and y is the type of die.
Usage: \`/roll xdy\` or \`/roll x d y\`
Example: \`/roll 4d6\`

**Magic Surge**
Will return a random magic surge effect.
Usage: \`/surge\` or \`/rollsurge\`
Example: \`/surge\`
        `;

        // Send the embed to the same channel as the message
        message.author.send(reply);
    }

    cmdSurge(message) {
        const surgeList = [
            {
                message: "Roll on this table at the start of each of your turns for the next minute, ignoring this result on subsequent rolls.",
            },
            {
                message: "For the next minute, you can see any invisible creature if you have line of sight to it.",
            },
            {
                message: "A modron chosen and controlled by the DM appears in an unoccupied space within 5 feet of you, then disappears I minute later.",
            },
            {
                message: "You cast __Fireball__ as a 3rd-level spell centered on yourself.",
                effect: "Fireball: http://dnd5e.wikidot.com/spell:fireball",
            },
            {
                message: "You cast __Magic Missile__ as a 5th-level spell.",
                effect: "Magic Missile: http://dnd5e.wikidot.com/spell:magic-missile",
            },
            {
                message: "Roll a d10. Your height changes by a number of inches equal to the roll. If the roll is odd, you shrink. If the roll is even, you grow.",
            },
            {
                message: "You cast __Confusion__ centered on yourself.",
                effect: "Confusion: http://dnd5e.wikidot.com/spell:confusion",
            },
            {
                message: "For the next minute, you regain 5 hit points at the start of each of your turns.",
            },
            {
                message: "You grow a long beard made of feathers that remains until you sneeze, at which point the feathers explode out from your face.",
            },
            {
                message: "You cast __Grease__ centered on yourself.",
                effect: "Grease: http://dnd5e.wikidot.com/spell:grease",
            },
            {
                message: "Creatures have disadvantage on saving throws against the next spell you cast in the next minute that involves a saving throw.",
            },
            {
                message: "Your skin turns a vibrant shade of blue. A __Remove Curse__ spell can end this effect.",
                effect: "Remove Curse: http://dnd5e.wikidot.com/spell:remove-curse",
            },
            {
                message: "An eye appears on your forehead for the next minute. During that time, you have advantage on Wisdom (Perception) checks that rely on sight.",
            },
            {
                message: "For the next minute, all your spells with a casting time of 1 action have a casting time of 1 bonus action.",
            },
            {
                message: "You teleport up to 60 feet to an unoccupied space of your choice that you can see.",
            },
            {
                message: "You are transported to the Astral Plane until the end of your next turn, after which time you return to the space you previously occupied or the nearest unoccupied space if that space is occupied."
            },
            {
                message: "Maximize the damage of the next damaging spell you cast within the next minute.",
            },
            {
                message: "Roll a d10. Your age changes by a number of years equal to the roll. If the roll is odd, you get younger (minimum 1 year old). If the roll is even, you get older.",
            },
            {
                message: "1d6 flumphs controlled by the DM appear in unoccupied spaces within 60 feet of you and are frightened of you. They vanish after 1 minute.",
            },
            {
                message: "You regain 2d10 hit points.",
            },
            {
                message: "You turn into a potted plant until the start of your next turn. While a plant, you are incapacitated and have vulnerability to all damage. If you drop to 0 hit points, your pot breaks, and your form reverts.",
            },
            {
                message: "For the next minute, you can teleport up to 20 feet as a bonus action on each of your turns.",
            },
            {
                message: "You cast __Levitate__ on yourself. ",
                effect: "Levitate: http://dnd5e.wikidot.com/spell:levitate",
            },
            {
                message: "A unicorn controlled by the DM appears in a space within 5 feet of you, then disappears 1 minute later.",
            },
            {
                message: "You can't speak for the next minute. Whenever you try, pink bubbles float out of your mouth.",
            },

            {
                message: "A spectral shield hovers near you for the next minute, granting you a +2 bonus to AC and immunity to __Magic Missile__.",
                effect: "Magic Missile: http://dnd5e.wikidot.com/spell:magic-missile",
            },
            {
                message: "You are immune to being intoxicated by alcohol for the next 5d6 days.",
            },
            {
                message: "Your hair falls out but grows back within 24 hours.",
            },
            {
                message: "For the next minute, any flammable object you touch that isn't being worn or carried by another creature bursts into flame.",
            },
            {
                message: "You regain your lowest-level expended spell slot.",
            },
            {
                message: "For the next minute, you must shout when you speak.",
            },
            {
                message: "You cast __Fog Cloud__ centered on yourself.",
                effect: "Fog Cloud: http://dnd5e.wikidot.com/spell:fog-cloud",
            },
            {
                message: "Up to three creatures you choose within 30 feet of you take 4d10 lightning damage.",
            },
            {
                message: "You are frightened by the nearest creature until the end of your next turn.",
            },
            {
                message: "Each creature within 30 feet of you becomes invisible for the next minute. The invisibility ends on a creature when it attacks or casts a spell.",
            },
            {
                message: "You gain resistance to all damage for the next minute.",
            },
            {
                message: "A random creature within 60 feet of you becomes poisoned for 1d4 hours.",
            },
            {
                message: "You glow with bright light in a 30-foot radius for the next minute. Any creature that ends its turn within 5 feet of you is blinded until the end of its next turn.",
            },
            {
                message: "You cast __Polymorph__ on yourself. If you fail the saving throw, you turn into a sheep for the spell's duration.",
                effect: "Polymorph: http://dnd5e.wikidot.com/spell:polymorph",
            },
            {
                message: "Illusory butterflies and flower petals flutter in the air within 10 feet of you for the next minute.",
            },
            {
                message: "You can take one additional action immediately.",
            },
            {
                message: "Each creature within 30 feet of you takes 1d10 necrotic damage. You regain hit points equal to the sum of the necrotic damage dealt.",
            },
            {
                message: "You cast __Mirror Image__.",
                effect: "Mirror Image: http://dnd5e.wikidot.com/spell:mirror-image",
            },
            {
                message: "You cast __Fly__ on a random creature within 60 feet of you.",
                effect: "Fly: http://dnd5e.wikidot.com/spell:fly",
            },
            {
                message: "You become invisible for the next minute. During that time, other creatures can't hear you. The invisibility ends if you attack or cast a spell.",
            },
            {
                message: "If you die within the next minute, you immediately come back to life as if by the __Reincarnate__ spell.",
                effect: "Reincarnate: http://dnd5e.wikidot.com/spell:reincarnate",
            },
            {
                message: "Your size increases by one size category for the next minute.",
            },
            {
                message: "You and all creatures within 30 feet of you gain vulnerability to piercing damage for the next minute.",
            },
            {
                message: "You are surrounded by faint, ethereal music for the next minute.",
            },
            {
                message: "You regain all expended sorcery points.",
            },
        ];

        let roll = this.between(1, 100);

        const surge = surgeList.find((surgeEffect, index) => {
            const min = (index * 2) + 1;
            const max = min + 1;

            return (roll >= min && roll <= max);
        });

        const result = new RichEmbed()
            // Set the title of the field
            .setTitle(`:zap: Spell Surge! (#${roll})`)
            // Set the color of the embed
            .setColor(0xFF0000)
            // Set the main content of the embed
            .setDescription(`"${surge.message}"`);

        if (surge.effect) {
            result.addField('Effect Details:', surge.effect)
        }

        // Send the embed to the same channel as the message
        message.channel.send(result);
    }

    /**
     * The /roll xDy command
     * @param  {DiscordJS Message} message
     */
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
