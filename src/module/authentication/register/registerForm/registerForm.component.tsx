'use client';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { GiTriforce } from "react-icons/gi";
import { IoArrowBackCircle } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { toast } from 'sonner';
import { registerUser } from '~/lib/utils/authentication';
import { RegisterType } from './registerForm.utils';

const RegisterFormComponent = () => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterType>();

    const onSubmit: SubmitHandler<RegisterType> = async (data) => {
        setSubmitLoading(true);
        try{
            await registerUser(data)
            setSubmitLoading(false);
            toast.success('Inscription validé !')
            router.push('/connexion');
        }
        catch (error) { 
            toast.error('Inscription échoué !')
            console.log(error)
            setSubmitLoading(false);
        }
    };

    return <div className="w-full relative">
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center gap-3">
            {/* LastName */}
            <div className='w-full'>
                <label className="border-[1px] w-full border-blue-500 rounded-md hover:border-cyan-500 hover:shadow-lg focus-within:border-cyan-500 focus:outline-none px-2 py-1 focus:shadow-lg flex gap-2 items-center group transition duration-200">
                    <FaUser
                        size={15}
                        className="text-blue-500 group-focus-within:text-cyan-500 transition duration-200 group group-hover:text-cyan-500"
                    />
                    <input
                        type="text"
                        className="border-transparent focus:border-transparent w-full focus:outline-none group"
                        placeholder="Nom"
                        {...register('lastName', { required: true,  pattern: /^[A-Za-z]+$/i,
                        maxLength: 20 })}
                    />
                </label>
                {errors.lastName?.type === "pattern" && (
                                <span className="text-red-500 text-xs">
                                    Le nom doit être valide
                                </span>
                            )}
                            {errors.lastName?.type === "required" && (
                                <span className="text-red-500 text-xs">
                                    Le nom est obligatoire
                                </span>
                            )}
                            {errors.lastName?.type === "maxLength" && (
                                <span className="text-red-500 text-xs">
                                    Le nom est trop long
                                </span>
                            )}
            </div>
            {/* FirstName */}
            <div className='w-full'>
                <label className="border-[1px] w-full border-blue-500 rounded-md hover:border-cyan-500 hover:shadow-lg focus-within:border-cyan-500 focus:outline-none px-2 py-1 focus:shadow-lg flex gap-2 items-center group transition duration-200">
                    <FaUser
                        size={15}
                        className="text-blue-500 group-focus-within:text-cyan-500 transition duration-200 group group-hover:text-cyan-500"
                    />
                    <input
                        type="text"
                        className="border-transparent focus:border-transparent w-full focus:outline-none group"
                        placeholder="Prénom"
                        {...register('firstName', { required: true,  pattern: /^[A-Za-z]+$/i,
                        maxLength: 20 })}
                    />
                </label>
                {errors.firstName?.type === "pattern" && (
                                <span className="text-red-500 text-xs">
                                    Le prénom doit être valide
                                </span>
                            )}
                {errors.firstName?.type === "required" && (
                                <span className="text-red-500 text-xs">
                                    Le prénom est obligatoire
                                </span>
                            )}
                {errors.firstName?.type === "maxLength" && (
                                <span className="text-red-500 text-xs">
                                    Le prénom est trop long
                                </span>
                            )}
            </div>
            {/* Trigramme */}
            <div className='w-full'>
                <label className="border-[1px] w-full border-blue-500 rounded-md hover:border-cyan-500 hover:shadow-lg focus-within:border-cyan-500 focus:outline-none px-2 py-1 focus:shadow-lg flex gap-2 items-center group transition duration-200">
                    <GiTriforce 
                        size={15}
                        className="text-blue-500 group-focus-within:text-cyan-500 transition duration-200 group group-hover:text-cyan-500"
                    />
                    <input
                        type="text"
                        className="border-transparent focus:border-transparent w-full focus:outline-none group"
                        placeholder="Trigramme"
                        {...register('trigramme', { required: true,  pattern: /^[A-Za-z]+$/i,
                        maxLength: 3, minLength: 3 })}
                    />
                </label>
                {errors.trigramme?.type === "pattern" && (
                                <span className="text-red-500 text-xs">
                                    Le trigramme doit être valide
                                </span>
                            )}
                {errors.trigramme?.type === "required" && (
                                <span className="text-red-500 text-xs">
                                    Le trigramme est obligatoire
                                </span>
                            )}
                {errors.trigramme?.type === "maxLength" && (
                                <span className="text-red-500 text-xs">
                                    Le trigramme est trop long
                                </span>
                            )}
                {errors.trigramme?.type === "minLength" && (
                                <span className="text-red-500 text-xs">
                                    Le trigramme est trop court
                                </span>
                )}
            </div>
            {/* Email */}
            <div className='w-full'>
                <label className="border-[1px] w-full border-blue-500 rounded-md hover:border-cyan-500 hover:shadow-lg focus-within:border-cyan-500 focus:outline-none px-2 py-1 focus:shadow-lg flex gap-2 items-center group transition duration-200">
                    <MdEmail 
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
        {/* Back et Inscription */}
        <div className="flex max-md:flex-col md:justify-between md:items-center gap-2 mt-6 ">
            <div
                    className=" text-blue-500 hover:text-blue-400 active:scale-95 transition duration-150 ease-in-out cursor-pointer max-md:hidden disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:active:scale-100 disabled:cursor-not-allowed"
                    disabled={submitLoading}
                    onClick={() => router.push('/connexion')}
                >
                    <IoArrowBackCircle size={50} />
            </div>
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
                        <p className="text-sm">Valider</p>
                    </div>
                )}
            </button>
        </div>
    </form>  
</div>;
};

export default RegisterFormComponent;
