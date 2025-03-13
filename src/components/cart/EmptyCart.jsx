import LinkButton from '../../UI/LinkButton';

function EmptyCart() {
    return (
        <div className="px-2 py-1">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            <p className="mt-25 text-center font-semibold">
                Your cart is still empty. Start adding some pizzas :)
            </p>
        </div>
    );
}

export default EmptyCart;
