import { useDispatch } from 'react-redux';
import Button from '../../UI/Button';
import { deleteItem } from '../../redux/cartSlice';

function DeleteItem({ itemId }) {
    const dispatch = useDispatch()
    function deleteHandler() {
        dispatch(deleteItem(itemId))
    }

    return (
        <Button type="small" onClick={deleteHandler}>delete</Button>
    )
}

export default DeleteItem
