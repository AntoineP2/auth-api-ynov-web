'use client';
import { Spin } from 'antd';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { toast } from 'sonner';
import { getUser } from '~/lib/utils/authentication';
import { decodeToken } from '~/lib/utils/decodeToken';

const LoginFormComponent = () => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInType>();

    const onSubmit: SubmitHandler<SignInType> = async (data) => {
        const { email, password } = data;
        setSubmitLoading(true);
        try {
            const token = await getUser(email, password);
            setCookie('tokenAuth', token, { sameSite: 'Lax', maxAge: 60 * 60 * 24 });
            const data = await decodeToken(token);
            setSubmitLoading(false);
            toast.success('Vous êtes connecté !')
            router.push('/espace-utilisateur');
        }
        catch (error) { 
            toast.error('Identifiants incorrects !')
            setSubmitLoading(false);
        }
    };

    const handleInscription = () => {
        if(!submitLoading) router.push('/connexion/inscription')
    }

    return (
        <div className="w-full relative">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center items-center gap-3">
                    {/* EMAIL */}
                    <div className='w-full'>
                        <label className="border-[1px] w-full border-blue-500 rounded-md hover:border-cyan-500 hover:shadow-lg focus-within:border-cyan-500 focus:outline-none px-2 py-1 focus:shadow-lg flex gap-2 items-center group transition duration-200">
                            <FaUser
                                size={15}
                                className="text-blue-500 group-focus-within:text-cyan-500 transition duration-200 group group-hover:text-cyan-500"
                            />
                            <input
                                type="text"
                                className="border-transparent focus:border-transparent w-full focus:outline-none group"
                                placeholder="Email"
                                {...register('email', { required: true,  pattern: /^\S+@\S+$/i,
                                maxLength: 50 })}
                            />
                        </label>
                        {errors.email?.type === "pattern" && (
                                        <span className="text-red-500 text-xs">
                                            Le mail doit être valide
                                        </span>
                                    )}
                                    {errors.email?.type === "required" && (
                                        <span className="text-red-500 text-xs">
                                            Le mail est obligatoire
                                        </span>
                                    )}
                                    {errors.email?.type === "maxLength" && (
                                        <span className="text-red-500 text-xs">
                                            Le mail est trop long
                                        </span>
                                    )}
                    </div>
                    {/* Mot de Passe */}
                    <div className='w-full'>
                        <label className="border-[1px] w-full border-blue-500 rounded-md hover:border-cyan-500 hover:shadow-lg focus-within:border-cyan-500 focus:outline-none px-2 py-1 focus:shadow-lg flex gap-2 items-center group transition duration-200">
                            <FaLock
                                size={15}
                                className="text-blue-500 group-focus-within:text-cyan-500 transition duration-200 group group-hover:text-cyan-500"
                            />
                            <input
                                type="password"
                                className="border-transparent focus:border-transparent w-full focus:outline-none group"
                                placeholder="Mot de passe"
                                {...(register('password', { required: true, required: true,
                                    pattern: /^[A-Za-z0-9!@#$%^&*()-_+=]+$/,
                                    maxLength: 30
                                }))}
                            />
                        </label>
                        {errors.password?.type === "required" && (
                                        <span className="text-red-500 text-xs">
                                            Le mot de passe est obligatoire
                                        </span>
                                    )}
                                    {errors.password?.type === "maxLength" && (
                                        <span className="text-red-500 text-xs">
                                            Le mot de passe est trop long
                                        </span>
                                    )}
                                    {errors.password?.type === "pattern" && (
                                        <span className="text-red-500 text-xs">
                                            Le mot de passe est mauvais
                                        </span>
                                    )}
                    </div>
                </div>
                {/* Connexion et Inscription */}
                <div className="flex max-md:flex-col justify-end gap-2 mt-6">
                <button
                    className="px-4 py-3 bg-blue-500 hover:bg-blue-400 transition duration-150 ease-in-out active:scale-95 rounded-lg disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:active:scale-100 disabled:cursor-not-allowed md:w-[150px] md:order-2"
                    disabled={submitLoading}
                    onClick={handleSubmit(onSubmit)}
                >
                    {' '}
                    {submitLoading ? (
                        <Spin spinning={submitLoading} />
                    ) : (
                        <div className="flex justify-center items-center gap-3 text-white">
                            <p className="text-sm">Connexion</p>
                        </div>
                    )}
                </button>
                <div
                    className={`px-4 py-3 bg-cyan-500 hover:bg-cyan-400 transition duration-150 ease-in-out active:scale-95 rounded-lg ${submitLoading && "bg-gray-500 hover:bg-gray-500 active:scale-100 cursor-not-allowed"}  cursor-pointer md:w-[150px] md:order-1`}
                    disabled={submitLoading}
                    onClick={handleInscription}
                >
                        <div className="flex justify-center items-center gap-3 text-white">
                            <p className="text-sm">Inscription</p>
                        </div>
               
                </div>
                </div>
            </form>  
        </div>
    );
};

export default LoginFormComponent;
