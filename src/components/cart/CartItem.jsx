import { useDispatch } from 'react-redux';
import { incItemQuantity, decItemQuantity } from '../../redux/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import Button from '../../UI/Button';

function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice } = item;
    const dispatch = useDispatch();

    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between">
            <p className="mb-1 sm:mb-0">
                {quantity} &times; {name}
            </p>
            <div className="flex items-center justify-between sm:gap-4">
                <p>{formatCurrency(totalPrice)}</p>
                <Button
                    type="smallControl"
                    onClick={() => dispatch(decItemQuantity(pizzaId))}
                >
                    -
                </Button>
                <p className="text-sm font-medium">{quantity}</p>
                <Button
                    type="smallControl"
                    onClick={() => dispatch(incItemQuantity(pizzaId))}
                >
                    +
                </Button>
                <DeleteItem itemId={item.pizzaId} />
            </div>
        </li>
    );
}

export default CartItem;
