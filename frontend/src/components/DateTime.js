const DateTime = ({ dateTime }) => {
    const dateTimeString = new Date(dateTime);
    const options = { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" };
    const formattedDate = dateTimeString.toLocaleString("en-GB", options).replace(",", "").replace(/\//g, ".");
    
  return (
    <>{formattedDate}</>
  )
}

export default DateTime