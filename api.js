var axios = require('axios')
const jsdom = require("jsdom");
const qs = require('qs');

const getPrice = async (ticker) => {
    var usAPI = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?region=SG&lang=en-SG`
    var usBid = `https://sg.finance.yahoo.com/quote/${ticker}`
    var sgAPI = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.si?region=SG&lang=en-SG`
    var sgBid = `https://sg.finance.yahoo.com/quote/${ticker}.si`
    let pricePromises = [getFromAPI(usAPI),getFromAPI(sgAPI)]
    let priceArray = []
    let bidPromises = [getBids(usBid)]
    await Promise.all(pricePromises).then((response) => {
        response.forEach((resp) => {
            if(resp[0] != null) {
                priceArray = resp
            }
        })
    })
    await Promise.all(bidPromises).then((response) => {
        console.log("resolve bid promises")
    })
    return priceArray
    
}
const getFromAPI = async (baseUrl) => {
    return axios.get(baseUrl).then((response) => {
        return [
            response.data.chart.result[0].meta.currency,
            response.data.chart.result[0].meta.instrumentType,
            response.data.chart.result[0].meta.symbol,
            response.data.chart.result[0].meta.regularMarketPrice,
            response.data.chart.result[0].meta.chartPreviousClose]
    }).catch((error) => {
        return false
    })
}

const getBids = async(baseUrl) => {
    console.log(baseUrl)
    const pattern = /data-reactid="52">([0-9.]+)/g
    axios.get(baseUrl).then((response) => {
        const html = response.data
        const test = 'data-reactid="52">227.01'
        const matched = pattern.exec(html)
        console.log(html)
        
    })
}

module.exports = {
    getPrice
}