import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { routes } from "@/config/site";

type FormData = {
  email: string;
  password: string;
};

type LoginResponse = {
  data: {
    token: string;
  };
};

const loginRequest = async (data: FormData): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      navigate(routes.dashboard);
    },
    onError: (error: any) => {
      setErrors({
        email: error.message || "Login error",
        password: error.message || "Login error",
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as FormData;

    setErrors({});
    mutate(formData);
  };

  return (
    <Form
      className="flex flex-col gap-4"
      id="login"
      validationErrors={errors}
      onSubmit={onSubmit}>
      <Input
        isRequired
        label="Email"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      <Input
        isRequired
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
        validate={(value: string) => {
          if (value.length < 6) {
            return "Password must be at least 6 characters long";
          }

          return true;
        }}
      />
      <div className="w-full flex gap-2 justify-end">
        <Button fullWidth color="primary" isLoading={isPending} type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default Login;
