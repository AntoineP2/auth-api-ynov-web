'use client';
import { useRouter } from 'next/navigation';
import { IoArrowBackCircle } from 'react-icons/io5';
import RegisterFormComponent from './registerForm/registerForm.component';
const RegisterComponent = () => {
    const router = useRouter();
    return (
        <>
            <div className="flex relative flex-col justify-center items-center gap-3 md:w-[550px] w-[80%] bg-white shadow-xl py-10 px-14 ">
                <button
                    className="md:hidden absolute top-2 left-2 text-blue-500 hover:text-blue-400 active:scale-95 transition duration-150 ease-in-out"
                    onClick={() => router.push('/connexion')}
                >
                    <IoArrowBackCircle size={40} />
                </button>
                <h2 className="text-2xl font-semibold text-blue-950">Inscription</h2>
                <RegisterFormComponent />
            </div>
        </>
    );
};

export default RegisterComponent;
