const TransactionItem = props => {
  const {details, onClickDelete} = props
  const {title, amount, type, id} = details

  const onClickButton = () => {
    onClickDelete(id, amount, type)
  }
  return (
    <li>
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button type="button" data-testid="delete" onClick={onClickButton}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
