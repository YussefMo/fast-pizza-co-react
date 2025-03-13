import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';
import LinkButton from '../../UI/LinkButton';
import Button from '../../UI/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart'

function Cart() {
    const username = useSelector((state) => state.user.username);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch()

    function clearCartHandler() {
        dispatch(clearCart())
    }

    if (cart.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="px-2 py-1">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            <h2 className="mt-7 text-xl font-semibold">
                Your cart, {username}
            </h2>
            <ul className="mt-4 divide-y divide-stone-300 border-t border-b">
                {cart.map((item) => (
                    <CartItem key={item.pizzaId} item={item} />
                ))}
            </ul>
            <div className="mt-6 space-x-2">
                <Button type="primary" to="/order/new">
                    Order pizzas
                </Button>
                <Button onClick={clearCartHandler} type="secondary">Clear cart</Button>
            </div>
        </div>
    );
}

export default Cart;
