interface Props {
  amount: number,
  currencies: string[],
  selectedCurrency: string,
  onChangeAmount: (value: number) => void,
  onChangeSelectCurrency: (currency: string) => void,
};

export const ConverterInput: React.FC<Props> = (props) => {
  const { 
    amount, 
    currencies, 
    selectedCurrency,
    onChangeAmount,
    onChangeSelectCurrency
  } = props;

  return (
    <form className="row mb-4">
      <div className="col-lg-9 col-md-9 col-sm-9">
        <input 
          className="form-control form-control-lg mx-3"
          type="number"
          min={0}
          value={amount}
          onChange={event => onChangeAmount(+event.target.value)}
        />
      </div>

      <div className="col-lg-auto col-md-auto col-sm-auto">
        <select 
          className="form-control form-control-lg"
          value={selectedCurrency}
          onChange={event => onChangeSelectCurrency(event.target.value)}
        >
          {currencies.map(currency => (
            <option 
              key={currency}
              value={currency}
            >
              {currency}
            </option>
          ))}
        </select>
      </div>
  </form>
  );
}
