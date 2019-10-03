var axios = require('axios')


const getPrice = async (ticker) => {
    var baseUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?region=SG&lang=en-SG`
    return axios.get(baseUrl).then((response) => {
        // console.log(response.data.chart.result[0].meta)
        return [response.data.chart.result[0].meta.regularMarketPrice,response.data.chart.result[0].meta.chartPreviousClose]
    }).catch((error) => {
        return false
    })
}
module.exports = {
    getPrice
}