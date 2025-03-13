import { useDispatch, useSelector } from 'react-redux';

import { addItem, getQuantityByItemId } from '../../redux/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../UI/Button';
import DeleteItem from '../cart/DeleteItem';

function MenuItem({ pizza }) {
    const dispatch = useDispatch();
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
    const isAdded = useSelector(getQuantityByItemId(id))

    function addItemHandler() {
        const addedItem = {
            pizzaId: id,
            name,
            unitPrice,
            quantity: 1,
            totalPrice: unitPrice
        };
        dispatch(addItem(addedItem));
    }

    return (
        <li className="flex gap-4 py-2">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut && 'opacity-70 grayscale'}`}
            />
            <div className="flex grow flex-col pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-stone-500 capitalize italic">
                    {ingredients.join(', ')}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="text-sm font-medium text-stone-500 uppercase">
                            Sold out
                        </p>
                    )}
                    <div className="space-x-2">
                        {isAdded !==0 && <DeleteItem itemId={id} />}
                        <Button
                            type="small"
                            disabled={soldOut}
                            onClick={addItemHandler}
                        >
                            add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
