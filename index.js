const mineflayer = require('mineflayer');

// Server aur Bot ki details (Railway Environment Variables ya direct values)
const serverConfig = {
    host: process.env.SERVER_IP || 'gold.magmanode.com', // Apne server ka IP yahan dalein
    port: parseInt(process.env.SERVER_PORT) || 30650,             // Server ka port
    username: process.env.BOT_NAME || 'MrCRISTIANOO',               // Bot ka Minecraft username
    version: false                                               // Automatic version detection
};

const password = process.env.BOT_PASSWORD || 'siuu'; // Bot ka password

function createBot() {
    const bot = mineflayer.createBot(serverConfig);

    // Jab bot server me spawn ho jaye
    bot.on('spawn', () => {
        console.log('Bot successfully server me enter ho gaya hai!');
    });

    // Server ki chat ko read karke login/register karna
    bot.on('chat', (username, message) => {
        // Agar message bot ka apna hai toh ignore karein
        if (username === bot.username) return;

        const msg = message.toLowerCase();

        // Agar server register karne ka bole
        if (msg.includes('register') || msg.includes('/register')) {
            setTimeout(() => {
                bot.chat(`/register ${password} ${password}`);
                console.log('Bot ne /register command bhej diya hai.');
            }, 1000);
        }

        // Agar server login karne ka bole
        if (msg.includes('login') || msg.includes('/login')) {
            setTimeout(() => {
                bot.chat(`/login ${password}`);
                console.log('Bot ne /login command bhej diya hai.');
            }, 1000);
        }
    });

    // Agar bot kick ho jaye toh auto-reconnect karein
    bot.on('kicked', (reason) => {
        console.log(`Bot ko kick kar diya gaya hai. Reason: ${reason}`);
        reconnect();
    });

    // Agar connection toot jaye toh auto-reconnect karein
    bot.on('end', () => {
        console.log('Bot disconnect ho gaya hai. Dobara connect ho raha hai...');
        reconnect();
    });

    bot.on('error', (err) => {
        console.log('Error aa gaya:', err);
    });
}

function reconnect() {
    // 15 seconds ka delay taaki purana session completely close ho jaye
    setTimeout(() => {
        console.log('Server se dobara connect kiya ja raha hai...');
        createBot();
    }, 15000); 
}

// Bot ko start karne ke liye function call
createBot();
