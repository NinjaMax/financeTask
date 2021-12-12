
const tickers = [
    'AAPL', // Apple
    'GOOGL', // Alphabet
    'MSFT', // Microsoft
    'AMZN', // Amazon
    'FB', // Facebook
    'TSLA', // Tesla
  ];
  
  function randomValue(min = 0, max = 1, precision = 0) {
    const random = Math.random() * (max - min) + min;
    return random.toFixed(precision);
  }
  
  function utcDate() {
    const now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
  }
  
  const getQuotes = (socket) => {
  
    const quotes = tickers.map(ticker => ({
      ticker,
      exchange: 'NASDAQ',
      price: randomValue(100, 300, 2),
      change: randomValue(0, 200, 2),
      change_percent: randomValue(0, 1, 2),
      dividend: randomValue(0, 1, 2),
      yield: randomValue(0, 2, 2),
      last_trade_time: utcDate(),
    }));
    socket.emit("ticker", quotes);
};

module.exports = getQuotes;