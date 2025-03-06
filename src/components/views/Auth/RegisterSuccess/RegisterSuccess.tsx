import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex w-screen flex-col justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/ilustrations/email-send.svg"
          alt="success"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-bold text-danger-500">
            Create Account Success
          </h1>
          <p className="text-xl font-semibold text-gray-500">
            Check your email for account activation
          </p>
        </div>
        <Button
          color="danger"
          variant="bordered"
          size="lg"
          onClick={() => router.push("/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
