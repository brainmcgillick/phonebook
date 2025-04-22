const Filter = ({filterName, setFilterName}) => {
    const handleNewFilterName = (event) => {
      setFilterName(event.target.value)
    }
  
    return (
      <>
        filter shown with <input value={filterName} onChange={handleNewFilterName}/>
      </>
    )
  }

  export default Filter