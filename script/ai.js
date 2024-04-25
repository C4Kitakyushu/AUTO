const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Cici",
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "GPT4",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('𝘏𝘌𝘓𝘓𝘖 𝘊𝘐𝘊𝘐 𝘐𝘚 𝘈𝘓𝘐𝘝𝘌 , 𝘒𝘐𝘕𝘋𝘓𝘠 𝘗𝘙𝘖𝘝𝘐𝘋𝘌 𝘘𝘜𝘌𝘚𝘛𝘐𝘖𝘕 𝘛𝘖 𝘔𝘌(⁠≧⁠▽⁠≦⁠)', event.threadID, messageID);
        }
        api.sendMessage('🕙 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨 𝘺𝘰𝘶𝘳 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯 𝘸𝘢𝘪𝘵 𝘢 𝘴𝘦𝘤𝘰𝘯𝘥...', event.threadID);

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-3.5-turbo-16k-0613`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(`🧚 | 𝖢𝗂𝖼𝗂 𝖠𝗂 🪄\n━━━━━━━━━━━━━━━━\n${generatedText}\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};