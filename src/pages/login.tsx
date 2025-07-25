import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import { useRouter } from "next/router";
import { useLogin } from "@/hooks/auths/useAuth";
import { useAuthStatus } from "@/hooks/auths/useAuthStatus";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const { isAuthenticated } = useAuthStatus();
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (loginData: { username: string; password: string }) => {
    // Clear previous error message
    setErrorMessage("");

    loginMutation.mutate(loginData, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: () => {
        const message = "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง";
        setErrorMessage(message);
      },
    });
  };

  const handleClearError = () => {
    setErrorMessage("");
  };

  // Don't render login form if already authenticated
  // if (isAuthenticated) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
  //         <p className="mt-4 text-lg">กำลังโหลด...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white">
      <div
        className="flex flex-col gap-4 p-6 md:p-10"
        style={{
          backgroundImage: "url('/backoffice/images/right-section.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-1 items-center justify-center ">
          <div className="w-full lg:w-2/3 xl:w-1/2">
            <Image
              src="/backoffice/images/login-logo.jpg"
              alt="logo"
              width={200}
              height={200}
              className=" max-w-36 min-w-30 w-full h-auto mb-4 mx-auto"
            />
            <LoginForm
              onSubmit={handleSubmit}
              isLoading={loginMutation.isPending}
              errorMessage={errorMessage}
              onClearError={handleClearError}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/backoffice/images/login-bg.png"
          alt="Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
