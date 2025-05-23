import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupRequest } from "@/api/repoApi";
import { routes } from "@/config/site";
import { AuthFormData } from "@/types";

const SignUp = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      navigate(routes.dashboard);
    },
    onError: (error: any) => {
      setErrors({
        email: error.message || "Signup error",
        password: error.message || "Signup error",
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as AuthFormData;

    setErrors({});
    mutate(formData);
  };

  return (
    <Form
      className="flex flex-col gap-4"
      id="signup"
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
          SignUp
        </Button>
      </div>
    </Form>
  );
};

export default SignUp;
