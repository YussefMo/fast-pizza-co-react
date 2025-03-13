import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotalPrice } from '../../redux/cartSlice';
import { formatCurrency } from '../../utils/helpers';

import EmptyCart from '../cart/EmptyCart';
import Button from '../../UI/Button';
import { fetchAddress } from '../../redux/userSlice';

function CreateOrder() {
    const [withPriority, setWithPriority] = useState();

    const formErrors = useActionData();
    const dispatch = useDispatch();
    const {
        username,
        status,
        position,
        address: userAddress,
        errors
    } = useSelector((state) => state.user);
    const isLoadingAddress = status === 'loading';
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const cart = useSelector((state) => state.cart.cart);
    const cartTotal = useSelector(getCartTotalPrice);
    const priorityPrice = withPriority ? cartTotal * 0.2 : 0;
    const total = cartTotal + priorityPrice;

    if (cart.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="mt-8">
            <h2 className="mb-5 text-xl">Ready to order? Let's go!</h2>
            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        type="text"
                        name="customer"
                        required
                        className="input grow"
                        defaultValue={username}
                    />
                </div>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="input w-full"
                        />
                        {formErrors?.phone && (
                            <p className="mt-1 rounded-md bg-red-200 p-1 text-sm text-red-500">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>
                <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            type="text"
                            name="address"
                            required
                            className="input w-full"
                            disabled={isLoadingAddress}
                            defaultValue={userAddress}
                        />
                        {errors && (
                            <p className="mt-1 rounded-md bg-red-200 p-1 text-sm text-red-500">
                                {errors}
                            </p>
                        )}
                    </div>
                    <span className="absolute top-10 right-0 bottom-2 sm:top-1.5 sm:bottom-1.5">
                        {!position.latitude && !position.longitude && (
                            <Button
                                disabled={isLoadingAddress}
                                type="small"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(fetchAddress());
                                }}
                            >
                                Get Position
                            </Button>
                        )}
                    </span>
                </div>
                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="my-3 mr-2 h-4 w-4 cursor-pointer accent-yellow-400 focus:ring focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label
                        htmlFor="priority"
                        className="cursor-pointer font-medium"
                    >
                        Want to yo give your order priority?
                    </label>
                </div>
                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.latitude && position.longitude
                                ? `${position.latitude}, ${position.longitude}`
                                : ''
                        }
                    />
                    <Button type="primary" disabled={isSubmitting}>
                        {isSubmitting
                            ? 'Placing Order'
                            : `Order now ${formatCurrency(total)}`}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreateOrder;
