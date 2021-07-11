import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction | undefined {
    const newTransaction = new Transaction({ title, value, type });

    if (
      type === 'outcome' &&
      value > this.transactionsRepository.getBalance().total
    ) {
      return undefined;
    }
    this.transactionsRepository.create(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
