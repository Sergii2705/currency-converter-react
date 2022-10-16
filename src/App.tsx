import { useEffect, useState } from 'react';
import axios from 'axios';
import { Converter } from './components/Converter';
import { Header } from './components/Header';
import { TypeCurrency } from './types/TypeCurrency';
import { Spiner } from './components/Spiner';
import { MessageError } from './components/MessageError';
import './App.css';

function App() {
  const [exchangeRates, setExchangeRates] = useState<TypeCurrency>({});
  const [isLoadingExchangeRates, setIsloadingExchangeRates] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-GB');
    setCurrentDate(date);
    console.log(date);
  }, [])

  useEffect(() => {
    setIsloadingExchangeRates(true); 

    axios.get(
      `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json${currentDate}`)
    .then(res => {
      setExchangeRates({'UAH': 1, 
      ...Object.fromEntries([
        ...res.data.map((currency: any) => 
          [currency.cc,  currency.rate])
        ])
      }); 
    })
    .catch(() => setHasError(true))
    .finally(() => setIsloadingExchangeRates(false));
  }, [currentDate]);
  
  return (
    <div>
      {!isLoadingExchangeRates && !hasError &&
        <>
          <Header 
            dollarRate={exchangeRates['USD']} 
            euroRate={exchangeRates['EUR']} 
            currentDate={currentDate}
          />
          <Converter 
            exchangeRates={exchangeRates} 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate} 
          />
        </>}
      {isLoadingExchangeRates && <Spiner />}
      {hasError && <MessageError />}
    </div>
  );
}

export default App;
