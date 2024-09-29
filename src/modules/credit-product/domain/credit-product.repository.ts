import { CreditProduct, CreditProductId, UserId } from "./credit-product";

export interface CreditProductRepository {
  create(creditProduct: CreditProduct): Promise<void>;
  getByUserId(userId: UserId): Promise<CreditProduct[]>;
  delete(creditProductId: CreditProductId): Promise<void>;
}