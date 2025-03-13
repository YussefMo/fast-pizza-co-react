import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../UI/Button';

function UpdateOrder({ order }) {
    const fetcher = useFetcher();
    const priority = order.priority;

    return (
        <fetcher.Form method="PATCH" className="text-right">
            {!priority && <Button type="primary">make priority</Button>}
        </fetcher.Form>
    );
}

export default UpdateOrder;

// eslint-disable-next-line react-refresh/only-export-components, no-unused-vars
export async function action({request, params}) {
    const data = {priority: true}
    await updateOrder(params.orderId, data);

    return null
}