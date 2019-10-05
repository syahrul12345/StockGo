var axios = require('axios')


const getPrice = async (ticker) => {
    var usAPI = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?region=SG&lang=en-SG`
    var sgAPI = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.si?region=SG&lang=en-SG`
    let price = await getFromAPI(usAPI)
    //check if usPrice is false, if it is recall the API using the sgAPI
    if(price == false) {
        price = getFromAPI(sgAPI)
    }
    return price
}
const getFromAPI = async (baseUrl) => {
    return axios.get(baseUrl).then((response) => {
        console.log("resposne")
        // console.log(response.data.chart.result[0].meta)
        return [response.data.chart.result[0].meta.regularMarketPrice,response.data.chart.result[0].meta.chartPreviousClose]
    }).catch(() => {
        return false
    })
}

module.exports = {
    getPrice
}