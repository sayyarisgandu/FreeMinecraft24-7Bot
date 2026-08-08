const mineflayer = require('mineflayer');

const serverConfig = {
    host: process.env.SERVER_IP || 'gold.magmanode.com',
    port: parseInt(process.env.SERVER_PORT) || 30650,
    username: process.env.BOT_NAME || 'CristinaoooSIUUU',
    version: false
};

const password = process.env.BOT_PASSWORD || 'suii';

function createBot() {
    const bot = mineflayer.createBot(serverConfig);

    bot.on('spawn', () => {
        console.log('Bot successfully server me enter ho gaya hai!');
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        const msg = message.toLowerCase();

        if (msg.includes('register') || msg.includes('/register')) {
            setTimeout(() => {
                bot.chat(`/register ${password} ${password}`);
                console.log('Bot ne /register command bhej diya hai.');
            }, 1000);
        }

        if (msg.includes('login') || msg.includes('/login')) {
            setTimeout(() => {
                bot.chat(`/login ${password}`);
                console.log('Bot ne /login command bhej diya hai.');
            }, 1000);
        }
    });

    bot.on('kicked', (reason) => {
        console.log(`Bot ko kick kar diya gaya hai. Reason: ${reason}`);
        reconnect();
    });

    bot.on('end', () => {
        console.log('Bot disconnect ho gaya hai. Dobara connect ho raha hai...');
        reconnect();
    });

    bot.on('error', (err) => {
        console.log('Error aa gaya:', err);
    });
}

function reconnect() {
    setTimeout(() => {
        console.log('Server se dobara connect kiya ja raha hai...');
        createBot();
    }, 5000);
}

createBot();
