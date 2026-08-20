export interface CreditCard {
  id: string;
  cardNumber: string; // 例: "1234 5678 9012 3456"
  cardHolder: string; // 例: "John Doe"
  expirationMonth: string; // 例: "12"
  expirationYear: string; // 例: "2025"
}

export const CREDIT_CARD_KEYS_LABELS: Record<keyof CreditCard, string> = {
  id: "ID",
  cardNumber: "カード番号",
  cardHolder: "カード名義人",
  expirationMonth: "有効期限（月）",
  expirationYear: "有効期限（年）",
} as const;
