import React, { useEffect, useState } from 'react';

const CurrencyTable = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.currencyfreaks.com/latest?apikey=${process.env.REACT_APP_CURRENCY_API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setExchangeRates(data.rates);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please check your API key and internet connection.");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!exchangeRates) {
    return <p>Loading...</p>;
  }

  const currencies = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];

  return (
    <div style={{ backgroundColor: 'orange', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h2>Currency Exchange Rates</h2>
      <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '60%' }}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => {
            const exchangeRate = parseFloat(exchangeRates[currency]);
            const weBuy = (exchangeRate * 1.05).toFixed(4);
            const weSell = (exchangeRate * 0.95).toFixed(4);

            return (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{weBuy}</td>
                <td>{exchangeRate.toFixed(4)}</td>
                <td>{weSell}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ marginTop: '20px', fontSize: '12px' }}>
        Rates are based on 1 USD.<br />
        This application uses API from <a href="https://currencyfreaks.com" target="_blank" style={{ color: 'white' }}>CurrencyFreaks</a>.
      </p>
    </div>
  );
};

export default CurrencyTable;
