import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    // TODO
    /*
    let income = 0;
    let outcome = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else {
        outcome += transaction.value;
      }
    });
    const total = income - outcome;
    */
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((totalI, t) => {
        return totalI + t.value;
      }, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((totalI, t) => {
        return totalI + t.value;
      }, 0);

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transction = new Transaction({ title, value, type });

    this.transactions.push(transction);

    return transction;
  }
}

export default TransactionsRepository;
