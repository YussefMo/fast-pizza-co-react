import { useSelector } from 'react-redux';

function UserName() {
    const username = useSelector((state) => state.user.username);

    if (username) {
        return (
            <p className="hidden text-sm font-semibold sm:block">{username}</p>
        );
    }
}

export default UserName;
