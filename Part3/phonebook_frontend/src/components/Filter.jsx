const Filter = (props) => {
  return (
    <div>
      filter shown with<input value={props.filter} onChange={props.handleNewFilter}/>
    </div>
  )
}

export default Filter