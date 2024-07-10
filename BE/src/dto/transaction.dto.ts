export class TransactionCreateDto {
  from?: string;
  to?: string;
  amount?: number;
}

export class HistoryDto {
  address?: string;
}

export class RechargeDto {
  address?: string;
  amount?: number;
}

export class BuyMCFromSystemDto {
  address?: string;
  // USD
  amount?: number;
}
