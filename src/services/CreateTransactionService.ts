import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error(`parameters type not valid! ${type}`);
    }

    const balance = this.transactionsRepository.getBalance();
    const saldo = balance.total - value;

    if (type === 'outcome' && saldo < 0) {
      throw Error('Value is greater than allowed');
    }

    const transction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transction;
  }
}

export default CreateTransactionService;
