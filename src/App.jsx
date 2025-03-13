import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useGetMenu } from './hooks/useGetMenu';
import { useGetOrder } from './hooks/useGetOrder';
import { createOrderAction } from './actions/createOrderAction';
import { action as UpdatePriorityAction } from './components/order/UpdateOrder';

import Home from './UI/Home';
import Menu from './components/menu/Menu';
import Cart from './components/cart/Cart';
import CreateOrder from './components/order/CreateOrder';
import Order from './components/order/Order';
import AppLayout from './UI/AppLayout';
import Error from './UI/Error';

const router = createHashRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/menu',
                element: <Menu />,
                loader: useGetMenu,
                errorElement: <Error />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/order/new',
                element: <CreateOrder />,
                action: createOrderAction
            },
            {
                path: '/order/:orderId',
                element: <Order />,
                loader: useGetOrder,
                errorElement: <Error />,
                action: UpdatePriorityAction
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
