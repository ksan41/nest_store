export enum OrderState {
  BEFORE_PAYMENT = '미결제',
  PAYMENT_COMPLETE = '결제완료',
  PREPARING_DELIVERY = '배송준비중',
  DURING_DELIVERY = '배송중',
  COMPLETE = '배송완료',
  CANCEL = '주문취소',
}
