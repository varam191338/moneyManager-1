import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].displayText,
    balance: 0,
    income: 0,
    expense: 0,
    transactionsList: [],
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
      type: '',
    }))

    if (type === 'Income') {
      this.setState(prevState => ({income: prevState.income + Number(amount)}))
      this.setState(prevState => ({
        balance: prevState.balance + Number(amount),
      }))
    } else if (type === 'Expenses') {
      this.setState(prevState => ({
        balance: prevState.balance - Number(amount),
      }))
      this.setState(prevState => ({
        expense: prevState.expense + Number(amount),
      }))
    }
  }

  onClickDeleteButton = (id, type, amount) => {
    const {transactionsList} = this.state
    const filteredList = transactionsList.filter(eachItem => eachItem.id !== id)
    this.setState({transactionsList: filteredList})

    if (type === 'Income') {
      this.setState(prevState => ({income: prevState.income - Number(amount)}))
      this.setState(prevState => ({
        balance: prevState.balance - Number(amount),
      }))
    }
  }

  render() {
    const {
      balance,
      income,
      expense,
      title,
      amount,
      transactionsList,
    } = this.state

    return (
      <div>
        <h1>Hi, Richard</h1>
        <p>Welcome back to your money manager</p>
        <form onSubmit={this.onAddTransaction}>
          <label htmlFor="title">TITLE</label>
          <br />
          <input
            id="title"
            placeholder="TITLE"
            onChange={this.onChangeTitle}
            value={title}
          />
          <br />
          <label htmlFor="amount">AMOUNT</label>
          <br />
          <input
            id="amount"
            placeholder="AMOUNT"
            onChange={this.onChangeAmount}
            value={amount}
          />
          <p>TYPE</p>
          <select onChange={this.onChangeType}>
            {transactionTypeOptions.map(eachItem => (
              <option
                key={eachItem.optionId}
                id={eachItem.optionId}
                value={eachItem.displayText}
              >
                {eachItem.displayText}
              </option>
            ))}
          </select>
          <br />
          <button type="submit">Add</button>
        </form>
        <MoneyDetails balance={balance} income={income} expense={expense} />
        <div>
          <h1>History</h1>
          <p>Title</p>
          <p>Amount</p>
          <p>Type</p>
        </div>
        <ul>
          {transactionsList.map(eachItem => (
            <TransactionItem
              details={eachItem}
              key={eachItem.id}
              onClickDelete={this.onClickDeleteButton}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default MoneyManager
