/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { ConverterInput } from './ConverterInput';
import { TypeCurrency } from '../types/TypeCurrency';
import './Converter.css';

interface Props {
  exchangeRates: TypeCurrency,
  currentDate: string,
  setCurrentDate: (date: string) => void
}

export const Converter: React.FC<Props> = (props) => {
  const {
    exchangeRates, 
    currentDate,
    setCurrentDate
  } = props;

  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(1);
  const [currencyOne, setCurrencyOne] = useState('UAH');
  const [currencyTwo, setCurrencyTwo] = useState('USD');
  
  useEffect(() => {
    setAmountTwo(
      formatNumber(
        amountOne * exchangeRates[currencyOne] / exchangeRates[currencyTwo]));
  }, []);

  useEffect(() => {
    const dateToCheck = new Date().toLocaleDateString('en-GB');

    if (currentDate !== dateToCheck) {
      setCurrentDate(dateToCheck);
    }
  }, [amountOne, amountTwo])
  
  const formatNumber = useCallback(
    (num: number):number => +num.toFixed(4)
  , []);

  const handleChangeAmountOne = (amount: number) => {
    setAmountOne(amount);
    setAmountTwo(
      formatNumber(
        amount * exchangeRates[currencyOne] / exchangeRates[currencyTwo]));
  }

  const handleChangeAmountTwo = (amount: number) => {
    setAmountTwo(amount);
    setAmountOne(
      formatNumber(
        amount * exchangeRates[currencyTwo] / exchangeRates[currencyOne]));
  }

  const handleChangeSelectCurrencyOne = (currency: string) => {
    setCurrencyOne(currency);
    setAmountTwo(
      formatNumber(
        amountOne * exchangeRates[currency] / exchangeRates[currencyTwo]));
  }

  const handleChangeSelectCurrencyTwo = (currency: string) => {
    setCurrencyTwo(currency);
    setAmountOne(
      formatNumber(
        amountTwo * exchangeRates[currency] / exchangeRates[currencyOne]));
  }

  const handleSwapCurrencies = () => {
    const [newCurrencyOne, newCurrencyTwo] = [currencyTwo, currencyOne];

    setCurrencyOne(newCurrencyOne);
    setCurrencyTwo(newCurrencyTwo);
    setAmountTwo(
      formatNumber(
        amountOne * exchangeRates[newCurrencyOne] / exchangeRates[newCurrencyTwo]));
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <div className="card card-body shadow-lg">
            <h2 className="text-center mb-4 ">
              {`Convert ${currencyOne} to ${currencyTwo}`}
            </h2>  
            
            <div className="row">
              <div className="col-lg-10 col-md-10 col-sm-10">
                <ConverterInput 
                  currencies={Object.keys(exchangeRates).sort()}
                  amount={amountOne}
                  selectedCurrency={currencyOne}
                  onChangeAmount={handleChangeAmountOne}
                  onChangeSelectCurrency={handleChangeSelectCurrencyOne}
                />

                <ConverterInput 
                  currencies={Object.keys(exchangeRates).sort()}
                  amount={amountTwo}
                  selectedCurrency={currencyTwo}
                  onChangeAmount={handleChangeAmountTwo}
                  onChangeSelectCurrency={handleChangeSelectCurrencyTwo}
                />
              </div>   
    
              <div className="col-lg-2 col-md-2 col-sm-2 align-self-center mb-4">
                <p className="h1 swap"
                  onClick={handleSwapCurrencies}
                >
                  &#8595;&#8593;
                </p>
              </div>
    
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
