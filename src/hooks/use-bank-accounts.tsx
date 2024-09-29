import { useState, useEffect } from 'react';
import { BankAccountPlainData, BankAccountUserId } from '../modules/bank-account/domain/bankAccount';
import { ApiBankAccountRepository } from '../modules/bank-account/infrastructure/api-bank-account.repository';
import { useUser } from './user-context';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const bankAccountRepository = new ApiBankAccountRepository(apiUrl);

export const useBankAccounts = () => {
  const { user } = useUser();
  const [bankAccounts, setBankAccounts] = useState<BankAccountPlainData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBankAccounts = async () => {
    setIsLoading(true);
    if (!user?.id) {
      throw new Error('User is not defined.');
    }
    const userId = new BankAccountUserId(user.id.value);
    const accounts = await bankAccountRepository.findByUserId(userId);
    if (accounts) {
      setBankAccounts(accounts.map(account => account.toPlainData()));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchBankAccounts = async () => {
      await getBankAccounts();
    };
    if (user?.id) {
      fetchBankAccounts();
    }
  }, [user?.id]);

  return { bankAccounts, isLoading, getBankAccounts };
};
