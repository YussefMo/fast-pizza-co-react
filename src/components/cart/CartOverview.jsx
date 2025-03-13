import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartQuantity, getCartTotalPrice } from '../../redux/cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
    const cartQuantity = useSelector(getCartQuantity);
    const cartTotalPrice = useSelector(getCartTotalPrice);

    if (!cartQuantity || !cartTotalPrice) return null

    return (
        <div className="flex items-center justify-between bg-stone-800 p-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
            <p className="space-x-4 font-semibold text-stone-300">
                <span>
                    <span className="rounded-full bg-red-500 px-2 py-0.5 text-red-100">
                        {cartQuantity}
                    </span>{' '}
                    pizzas
                </span>
                <span>{formatCurrency(cartTotalPrice)}</span>
            </p>
            <Link to="/cart">Open cart &rarr;</Link>
        </div>
    );
}

export default CartOverview;
