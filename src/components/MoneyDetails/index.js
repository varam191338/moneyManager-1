const MoneyDetails = props => {
  const {income, expense, balance} = props

  return (
    <ul>
      <li>
        <p>Your Balance</p>
        <p data-testid="balanceAmount">Rs {balance}</p>
      </li>
      <li>
        <p>Your Income</p>
        <p data-testid="incomeAmount">Rs {income}</p>
      </li>
      <li>
        <p>Your Expense</p>
        <p data-testid="expensesAmount">Rs {expense}</p>
      </li>
    </ul>
  )
}

export default MoneyDetails
