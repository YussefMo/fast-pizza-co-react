import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
    const [query, setQuery] = useState();
    const navigate = useNavigate();
    function handelSubmit(e) {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery('');
    }

    return (
        <form onSubmit={handelSubmit}>
            <input
                type="text"
                placeholder="search order by id"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-48 rounded-full bg-yellow-100 px-3 py-1 transition-all duration-300 placeholder:text-stone-400 focus:w-50 focus:ring focus:ring-yellow-500 focus:outline-none sm:w-72 sm:focus:w-80"
            />
        </form>
    );
}

export default SearchOrder;
