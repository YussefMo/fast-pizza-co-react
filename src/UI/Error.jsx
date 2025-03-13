import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
    const error = useRouteError();

    return (
        <div className="mt-50 flex h-full w-full flex-col items-center justify-center text-xl">
            <h1 className="mb-4">Something went wrong 😢</h1>
            <p className="mb-4">{error.message ? error.message : error.data}</p>
            <LinkButton to="-1" />
        </div>
    );
}

export default Error;
