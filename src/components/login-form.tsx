import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps
  extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  onSubmit: (loginData: { username: string; password: string }) => void;
  isLoading?: boolean;
  errorMessage?: string;
  onClearError?: () => void;
}

export function LoginForm({
  className,
  onSubmit,
  isLoading = false,
  errorMessage,
  onClearError,
  ...props
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const loginData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    onSubmit(loginData);
  };

  const handleButtonClick = () => {
    const form = document.getElementById("login-form") as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);
      const loginData = {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      };
      onSubmit(loginData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="login-form"
      autoComplete="off"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      {/* <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold text-black">เข้าสู่ระบบ</h1>
      </div> */}

      <div className="grid gap-6 text-black">
        <div className="grid gap-3">
          <Label htmlFor="username">ชื่อผู้ใช้งาน</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder=""
            required
            autoComplete="off"
            onChange={onClearError}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">รหัสผ่าน</Label>
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="off"
              placeholder=""
              className="pr-10"
              onChange={onClearError}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <IconEye className="w-5 h-5" />
              ) : (
                <IconEyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-2">
            {errorMessage}
          </div>
        )}
        <Button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full rounded-full bg-highlight hover:bg-highlight/80 h-12 text-lg"
          disabled={isLoading}
        >
          {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </Button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">จดจำการเข้าสู่ระบบ</Label>
          </div>
          <Link
            href="/reset-password"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            ลืมรหัสผ่าน?
          </Link>
        </div>
        {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="text-black text-lg font-semibold bg-white relative z-10 px-2">
            หรือเข้าใช้ด้วยบัญชี
          </span>
        </div> */}
        {/* <Button
          variant="outline"
          className="w-full bg-[#030650] text-white rounded-full h-12 text-lg cursor-pointer hover:bg-[#030650]/80 hover:text-white"
        >
          <Image
            src="/backoffice/images/thaiid.png"
            alt="ThaiID"
            className="w-10 h-10 rounded-full "
            aria-hidden="true"
            width={40}
            height={40}
          />
          ThaiID
        </Button> */}
      </div>
      {/* <div className=" text-sm text-muted-foreground mx-auto">
        ยังไม่ได้ลงทะเบียนใช่ไหม?
        <Link
          href="/register"
          className=" mx-1 text-primary text-lg font-semibold"
        >
          สมัครสมาชิก
        </Link>
        เพื่อเข้าสู่ระบบ
      </div> */}
    </form>
  );
}
