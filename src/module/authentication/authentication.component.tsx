'use client';
import LoginFormComponent from './loginForm/loginForm.component';

const AuthentificationComponent = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-3 md:w-[550px] w-[80%] relative bg-white shadow-xl py-10 px-14 ">
                <h2 className="text-2xl font-semibold text-blue-950">Ma présence</h2>
                <LoginFormComponent />
            </div>
        </>
    );
};

export default AuthentificationComponent;
