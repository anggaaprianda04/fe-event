import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ToasterContext } from "@/contexts/ToasterContext";

const loginSchema = yup.object().shape({
    identifier: yup.string().required("Please input your username or email"),
    password: yup
        .string()
        .required("Please input your password"),
});

const useLogin = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter();
    const { setToaster } = useContext(ToasterContext);

    const callbackUrl: string = (router.query.callbackUrl as string) || "/";

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect: false,
            callbackUrl,
        });
        if (result?.error && result.status === 401) {
            throw new Error("Login failed")
        }
    }

    const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationFn: loginService,
        onError: () => {
            setToaster({
                type: "error",
                message: "Login credential is wrong"
            })
        },
        onSuccess() {
            reset();
            setToaster({
                type: "success",
                message: "Login successfully"
            })
            router.push(callbackUrl);
        },
    })

    const handleLogin = (data: ILogin) => mutateLogin(data);

    return {
        isVisible,
        toggleVisibility,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    };
};

export default useLogin;
