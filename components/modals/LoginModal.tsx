"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import { LoginSchema } from "@/schemas/formSchema";
import Modal from "./Modal";
import Heading from "./Heading";
import Input from "@/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/components/Button";
// import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    // login(data)
    //   .then((res) => {
    //     if (res?.error) {
    //       toast.error(res.error);
    //     }
    //     if (res?.success) {
    //       reset();
    //       toast.success(res.success);
    //       router.refresh();
    //       loginModal.onClose();
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch(() => toast.error("Something went wrong!"));

    // use below to call auth from client component--------
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Login successful!");
        loginModal.onClose();
        router.refresh();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        type="email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-3 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>First time using Flyaway?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggle}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
