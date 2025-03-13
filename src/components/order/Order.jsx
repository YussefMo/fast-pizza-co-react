import { useEffect } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate
} from '../../utils/helpers';

import OrderItem from './OrderItem';
import UpdateOrder from './UpdateOrder';

function Order() {
    const order = useLoaderData();
    const fetcher = useFetcher();

    useEffect(
        function () {
            if (!fetcher.data && fetcher.state === 'idle') {
                fetcher.load('/menu');
            }
        },
        [fetcher]
    );

    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart
    } = order;
    const deliveryIn = calcMinutesLeft(estimatedDelivery);

    return (
        <div className="space-y-8 px-2 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">Order #{id} Status</h2>
                <div className="space-x-2">
                    {priority && (
                        <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
                            Priority
                        </span>
                    )}
                    <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
                        {status} order
                    </span>
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-6 py-5">
                <p className="font-medium">
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                        : 'Order should have arrived'}
                </p>
                <p className="text-xs text-stone-500">
                    (Estimated delivery: {formatDate(estimatedDelivery)})
                </p>
            </div>
            <ul className="divide-y divide-stone-300 border-t border-b">
                {cart.map((item) => (
                    <OrderItem
                        key={item.id}
                        item={item}
                        isLoadingIngredients={fetcher.state === 'loading'}
                        ingredients={
                            fetcher.data?.find((el) => el.id === item.pizzaId)
                                .ingredients
                        }
                    />
                ))}
            </ul>
            <div className="space-y-2 bg-stone-300 px-6 py-5">
                <p>Price pizza: {formatCurrency(orderPrice)}</p>
                {priority && (
                    <p className="text-sm font-medium text-stone-600">
                        Price priority: {formatCurrency(priorityPrice)}
                    </p>
                )}
                <p className="font-bold">
                    To pay on delivery:{' '}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>
            <UpdateOrder order={order} />
        </div>
    );
}

export default Order;
