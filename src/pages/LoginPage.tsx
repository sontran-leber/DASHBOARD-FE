import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { login } from "@/utils/apiService";
import { setAuthTokens } from "@/utils/authUtils";
import type { ApiError } from "@/utils/apiService";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log("onSubmit called with:", data);
    setIsLoading(true);
    setError("");

    try {
      console.log("Calling login API...");
      // Call login API using Axios (with interceptor handling)
      const authData = await login(data);
      console.log("Login response:", authData);

      // Store JWT tokens in localStorage
      setAuthTokens({
        accessToken: authData.token,
        // refreshToken: authData.refreshToken,
      });

      // Store user data if available
      //   if (authData.user) {
      //     setUser(authData.user);
      //   }

      // Navigate to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      // Error is already handled by Axios interceptor
      const apiError = err as ApiError;
      setError(apiError.message || "An error occurred during login");

      // Handle validation errors if present
      if (apiError.errors) {
        const errorMessages = Object.values(apiError.errors).flat().join(", ");
        setError(errorMessages);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Dashboard Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(onSubmit)(e);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your account name"
                autoComplete="username"
                {...register("username", {
                  required: "Email is required",
                  //   pattern: {
                  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //     message: "Invalid email address",
                  //   },
                })}
                disabled={isLoading}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                disabled={isLoading}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-primary hover:underline font-medium"
              onClick={(e) => e.preventDefault()}
            >
              Sign up
            </a>
          </div>
          <a
            href="#"
            className="text-sm text-primary hover:underline text-center"
            onClick={(e) => e.preventDefault()}
          >
            Forgot password?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
