import { Outlet, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import CartOverview from '../components/cart/CartOverview';
import Spinner from '../UI/Spinner';
import Home from './Home';

function AppLayout() {
    const username = useSelector((state) => state.user.username);
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return (
        <section className="grid h-dvh grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="overflow-auto">
                <main className="mx-auto max-w-4xl overflow-y-auto p-2">
                    {username === '' ? (
                        <Home />
                    ) : isLoading ? (
                        <Spinner />
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
            <CartOverview />
        </section>
    );
}

export default AppLayout;
