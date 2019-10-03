const Telegraf = require('telegraf')
const {getPrice} =  require('./api.js')
require('dotenv').config()
//Creates the bot
const bot = new Telegraf(process.env.BOTTOKEN)
bot.start((ctx) => ctx.reply('This is a stock price bot'))
bot.hears(/^\/([a-z0-9]+$)/i, async (ctx) => {
    const ticker = ctx.match[1]
    const dataArray = await getPrice(ticker)
    if (dataArray == false) {
        let replyString = `Failed to get the price of ${ticker} stock. \nPlease use only stocks registered by Yahoo Finance.`
        ctx.reply(replyString)
    }else{
        let curPrice = dataArray[0]
        let prevPrice = dataArray[1]
        let diff = Math.round((curPrice - prevPrice)*100) / 100
        let percentageDiff = Math.round((diff/prevPrice)*100*100)/100
        replyString = `Price of ${ticker} stock: \nUS\$${curPrice} (\$${diff})`
        ctx.reply(replyString)
    }
    

})
bot.launch()