import { useState, useEffect } from 'react';
import { IncomePlainData, IncomeUserId } from '../modules/income/domain/income';
import { ApiIncomeRepository } from '../modules/income/infrastructure/api-income.repository';
import { useUser } from './user-context';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const incomeRepository = new ApiIncomeRepository(apiUrl);

export const useIncomes = () => {
  const { user } = useUser();
  const [incomes, setIncomes] = useState<IncomePlainData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getIncomes = async () => {
    setIsLoading(true);
    if (!user?.id) {
      throw new Error('User is not defined.');
    }
    const userId = new IncomeUserId(user.id.value);
    const incomes = await incomeRepository.getByUserId(userId);
    if (incomes) {
      setIncomes(incomes.map(income => income.toPlainData()));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchIncomes = async () => {
      await getIncomes();
    };
    if (user?.id) {
      fetchIncomes();
    }
  }, [user?.id]);

  return { incomes, isLoading, getIncomes };
};
