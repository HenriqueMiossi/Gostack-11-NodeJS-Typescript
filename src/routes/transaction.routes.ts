import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    return response.json({
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transaction = new Transaction({ title, value, type });
    const currentBalance = transactionsRepository.getBalance().total;

    if (transaction.type === 'outcome' && transaction.value > currentBalance)
      return response
        .status(400)
        .json({ error: 'Outcome value exceeds balance funds' });

    transactionsRepository.create(transaction);

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
