import { useState, useEffect } from 'react';
import { CreditProductPlainData, UserId } from '../modules/credit-product/domain/credit-product';
import { ApiCreditProductRepository } from '../modules/credit-product/infrastructure/api-credit-product.repository';
import { useUser } from './user-context';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const creditProductRepository = new ApiCreditProductRepository(apiUrl);

export const useCreditProducts = () => {
  const { user } = useUser();
  const [creditProducts, setCreditProducts] = useState<CreditProductPlainData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCreditProducts = async () => {
    setIsLoading(true);
    if (!user?.id) {
      throw new Error('User is not defined.');
    }
    const userId = new UserId(user.id.value);
    const products = await creditProductRepository.getByUserId(userId);
    if (products) {
      setCreditProducts(products.map(product => product.toPlainData()));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchCreditProducts = async () => {
      await getCreditProducts();
    };
    if (user?.id) {
      fetchCreditProducts();
    }
  }, [user?.id]);

  return { creditProducts, isLoading, getCreditProducts };
};
