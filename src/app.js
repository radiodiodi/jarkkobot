import Botkit from 'botkit';
import { token } from '../bot.json';
import plugins from '../plugins.conf.js';

const controller = Botkit.slackbot();

const bot = controller.spawn({
    token,
});

bot.startRTM((err, bot, payload) => {
    if (err) {
        throw new Error('Could not connect to Slack. Have you configured the correct bot token in bot.json?');
    }

    console.log('Connected to Slack!');

    plugins.forEach(plugin => {
        const { command, callback } = plugin;

        // listener that handles incoming messages
        controller.hears([command], ['direct_message', 'direct_mention'], (bot, message) => {
            controller.log(`Slack message received. Command: ${command}`);
            callback(bot.reply, message);
        });
    });
});

