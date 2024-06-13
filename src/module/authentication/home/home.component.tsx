'use client';
import { useEffect, useState } from 'react';
import HydratedComponent from '~/components/hydrated.component';
import { AuthenticationSelector } from '~/lib/redux/_slices/authentication/authentication.selectors';
import { useAppSelector } from '~/lib/redux/hooks';

const HomeComponent = () => {
    const { userLastName } = useAppSelector(AuthenticationSelector);
    const [userLastNameClient, setUserLastName] = useState('');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) return <HydratedComponent />;

    return (
        <div>
            <p>{userLastName}</p>
        </div>
    );
};

export default HomeComponent;
