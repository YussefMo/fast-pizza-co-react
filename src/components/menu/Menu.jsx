import { useLoaderData } from 'react-router-dom';

import MenuItem from './MenuItem';

function Menu() {
    const menu = useLoaderData();

    return (
        <ul className="divide-y divide-stone-300 px-2">
            {menu.map((pizza) => (
                <MenuItem key={pizza.id} pizza={pizza} />
            ))}
        </ul>
    );
}

export default Menu;
