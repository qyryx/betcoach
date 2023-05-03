import * as BiIcons from 'react-icons/bi';

const TableButton = ({ rates, handleClick, activeBet }) => {
  const [bet, rate] = Object.entries(rates)[0]
  const isActive = (activeBet === bet)

  return (
    <>
      {rate < 0 ? <button className={'tableButtonDisabled'} disabled={true}><BiIcons.BiLockAlt size={17} style={{ marginTop: -4.5 }}/></button>
        : <button className={isActive ? 'tableButton tableButtonActive' : 'tableButton'} onClick={() => handleClick(bet)}>{rate}</button>}
    </>
  )
}

export default TableButton