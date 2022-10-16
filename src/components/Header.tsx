interface Props {
  dollarRate: number;
  euroRate: number;
  currentDate: string;
}

export const Header: React.FC<Props> = (props) => {
  const {
    dollarRate, 
    euroRate, 
    currentDate
  } = props;
  
  return (
    <div className="header header">
      <p className="py-1 fs-5 text-center">
        NBU exchange rate on 
        <span className="burlywood"> {currentDate} </span>
        :
        <span className="yellow"> 1 USD</span>
        {`= ${dollarRate}UAH /`}
        <span className="yellow"> 1 EUR</span>
        {` = ${euroRate}UAH`}
      </p>
    </div>
  )
}
