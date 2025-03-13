import { redirect } from 'react-router-dom';
import { createOrder } from '../services/apiRestaurant';
import store from '../redux/store'
import { clearCart } from '../redux/cartSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export async function createOrderAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true'
    };

    const errors = {};
    if (!isValidPhone.test(order.phone)) {
        errors.phone =
            'please enter a valid phone number, we might need it to contact you';
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    const newOrder = await createOrder(order);
    store.dispatch(clearCart())

    return redirect(`/order/${newOrder.id}`);
}
