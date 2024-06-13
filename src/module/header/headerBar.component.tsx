'use client';
import { Avatar } from 'antd';
import { deleteCookie, getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { AuthenticationSelector } from '~/lib/redux/_slices/authentication/authentication.selectors';
import { resetUserData, setUserData } from '~/lib/redux/_slices/authentication/authentication.slice';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { decodeToken, isConnectedVerify } from '~/lib/utils/decodeToken';
import LogoIsb from '../../../public/logo/logo-isb.svg';
import NavBarComponent from './navBar.component';

const HeaderBar = () => {
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(false);
    const { userFirstName, userLastName, userTrigramme } = useAppSelector(AuthenticationSelector);
    const dispatch = useAppDispatch();
    const pathName = usePathname();

    const checkToken = async (): boolean => {
        (await isConnectedVerify(getCookie('tokenAuth'))) ? setIsConnected(true) : setIsConnected(false);
    };

    const decodeTokenUserData = async () => {
        const data = await decodeToken(getCookie('tokenAuth'));
        dispatch(setUserData(data));
    };

    useEffect(() => {
        setIsConnected(checkToken());
    }, [pathName]);

    useEffect(() => {
        if (isConnected) decodeTokenUserData();
    }, [isConnected]);

    const handleLogout = () => {
        deleteCookie('tokenAuth');
        dispatch(resetUserData());
        router.push('/connexion');
    };

    return (
        <>
            <div className="flex items-center relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white pl-[4%] h-14 w-screen shadow-lg shadow-slate-400">
                <div className="flex justify-center items-center gap-9 relative h-full py-2">
                    <button>
                        <LogoIsb onClick={() => router.push('/')} />
                    </button>

                    <div className="border-r border-white h-full"></div>
                </div>
                {isConnected && (
                    <div className="flex gap-2 justify-center items-center absolute right-[2%]">
                        <Avatar size="large" style={{ backgroundColor: '#87d068' }}>
                            <p className="uppercase font-bold cursor-default">{userTrigramme}</p>
                        </Avatar>
                        <p className="font-semibold text-sm capitalize cursor-default">
                            {userLastName} {userFirstName}
                        </p>
                        <button className="ml-2 pt-[2px]" onClick={() => handleLogout()}>
                            <MdLogout
                                size={25}
                                className="transition duration-150 active:scale-95 hover:text-red-500 cursor-pointer"
                            />
                        </button>
                    </div>
                )}
            </div>
            {isConnected && <NavBarComponent />}
        </>
    );
};

export default HeaderBar;
