import CreateUser from '../components/user/CreateUser';
import { useSelector } from 'react-redux';

import pizza from '../../assets/pizza.png';
import Button from './Button';

function Home() {
    const username = useSelector((state) => state.user.username);
    return (
        <div className="my-10 flex flex-col items-center justify-center px-4 text-center sm:my-16">
            <img src={pizza} alt="pizza" className="h-20" /> 
            <h1 className="mb-8 text-xl font-semibold">
                The best pizza.pizza
                <br />
                <span className="text-yellow-500">
                    Straight out of the oven, straight to you.
                </span>
            </h1>
            {username === "" ? <CreateUser /> : <Button to="/menu" type="primary">go to menu, {username}</Button>}
        </div>
    );
}

export default Home;
