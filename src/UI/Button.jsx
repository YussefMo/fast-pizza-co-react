import { Link } from 'react-router-dom';

function Button({ children, disabled, onClick, to, type }) {
    const className =
        'inline-block cursor-pointer rounded-full bg-yellow-400 font-semibold tracking-wide text-sm text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-200 focus:bg-yellow-200 focus:ring focus:ring-yellow-200 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed';
    const style = {
        primary: className + ' px-4 py-3 md:px-6 md:py-4',
        small: className + ' px-3 py-2 md:px-4 md:py-2 text-xs',
        secondary:
            'inline-block cursor-pointer rounded-full border-2 border-stone-300 font-semibold tracking-wide text-sm text-stone-800 uppercase transition-colors duration-300 hover:bg-stone-400 focus:bg-stone-400 focus:ring focus:ring-stone-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
        smallControl: className + ' px-2 py-1 text-xs'
    };

    if (to) {
        return (
            <Link to={to} className={style[type]}>
                {children}
            </Link>
        );
    }
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${style[type]} ${disabled && 'grayscale'}`}
        >
            {children}
        </button>
    );
}

export default Button;
