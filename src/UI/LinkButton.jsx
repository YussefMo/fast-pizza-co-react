import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
    const navigate = useNavigate();

    if (to === '-1') {
        return (
            <button
                className="text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate(-1)}
            >
                &larr; Go back
            </button>
        );
    }
    return (
        <Link
            to={to}
            className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
        >
            {children}
        </Link>
    );
}

export default LinkButton;
