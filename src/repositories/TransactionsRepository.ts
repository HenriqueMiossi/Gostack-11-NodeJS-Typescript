import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc, current) => {
      if (current.type === 'income') return acc + current.value;
      return acc;
    }, 0);

    const outcome = this.transactions.reduce((acc, current) => {
      if (current.type === 'outcome') return acc + current.value;
      return acc;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
