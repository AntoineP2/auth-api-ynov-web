'use client';
import { usePathname, useRouter } from 'next/navigation';
import { nabBarItems } from './navBar.utils';

const NavBarComponent = () => {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <div className="flex justify-center items-center w-screen h-14 bg-white border-b-2 gap-5">
            {nabBarItems.map(item => (
                <div
                    key={item.id}
                    className={`h-full flex justify-center items-center px-2 hover:border-b-2 hover:border-blue-500 hover:pt-[2px] transition duration-150 ease-in-out cursor-pointer group ${
                        pathName === item.path ? 'border-b-2 border-blue-500 pt-[2px] ' : ''
                    }`}
                >
                    <button
                        onClick={() => router.push(item.path)}
                        className={`text-slate-500 group-hover:text-slate-700 font-medium h-full ${
                            pathName === item.path ? 'text-slate-700' : ''
                        }`}
                    >
                        {item.title}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NavBarComponent;
