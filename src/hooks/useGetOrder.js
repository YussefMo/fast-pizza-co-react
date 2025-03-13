import { getOrder } from "../services/apiRestaurant";

export async function useGetOrder({ params }) {
    const order = getOrder(params.orderId)
    return order
}