"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/customFormField";

const RegisterValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),

  phone: z
    .string()
    .min(13, { message: "Phone number is too short" })
    .max(14, { message: "Phone number is too long" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
});


export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(RegisterValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="pt-32 h-full w-11/12 max-w-[1440px] mx-auto">
      <div className="w-4/7 mx-auto border-[rgba(255, 255, 255, 1)] border-2 p-20 rounded-md">
        <h1 className="text-2xl w-full text-center">
          Войти в аккаунт
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 sm:space-y-4"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              placeholder="Name"
              label="Name"
              inputClass="rounded-md border-[1px] h-11 text-muted-foreground"
            />
            <CustomFormField
              fieldType={FormFieldType.EMAIL}
              control={form.control}
              name="email"
              placeholder="Email"
              label="Email"
              inputClass="rounded-md border-[1px] h-11 text-muted-foreground"
            />
            <CustomFormField
              fieldType={FormFieldType.PASSWORDINPUT}
              control={form.control}
              name="password"
              placeholder="Password"
              label="Password"
              inputClass="rounded-md border-[1px] h-11 text-muted-foreground"
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              placeholder="Phone number"
              label="Phone Number"
              inputClass=""
            />
            <div className="w-full flex justify-center items-center flex-col gap-4">
              <p className="">Уже есть аккаунт?</p>
              <button type="submit" className="text-white bg-black hover:bg-black/80 min-w-1/2 p-2 rounded-md">
                Регистрация
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
