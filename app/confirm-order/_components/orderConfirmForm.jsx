"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/customFormField";
import { Button } from "@/components/ui/button";

const OrderValidation = z.object({
  phone: z.string().min(13, "Введите номер телефона").max(14),
  paymentType: z.string().min(1, "Выберите тип оплаты"),
});

export default function OrderConfirmForm() {
  const form = useForm({
    resolver: zodResolver(OrderValidation),
    defaultValues: {
      phone: "",
      paymentType: "",
    },
  });

  const onSubmit = (values) => {
    console.log("✅ Order submitted:", values);
    // bu yerda API chaqirishingiz yoki boshqa actions qo‘shishingiz mumkin
  };

  return (
    <div className="h-full w-11/12 max-w-[1200px] mx-auto pt-4">
      <div className="rounded-xl border p-10 shadow-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col md:flex-row gap-10">
              {/* Left: Form */}
              <div className="w-full md:w-2/3 space-y-5">
                <h2 className="text-xl font-semibold">Подтвердите заказ</h2>

                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  placeholder="99 999-99-99"
                  label="Номер телефона"
                />

                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="paymentType"
                  label="Тип оплаты"
                  placeholder="Выберите"
                  className="w-full"
                  options={[
                    { label: "Наличный", value: "cash" },
                    { label: "Карта", value: "card" },
                    { label: "Онлайн", value: "online" },
                  ]}
                />
              </div>

              {/* Right: Order Summary */}
              <div className="w-full md:w-1/3 bg-[#F9F9F9] p-6 rounded-lg space-y-3">
                <h3 className="text-center text-base font-semibold mb-2">Ваш заказ</h3>

                <div className="bg-white p-3 rounded-md flex justify-between text-sm">
                  <span>PM86</span>
                  <span className="text-muted-foreground">2x</span>
                  <span className="font-medium">3 000 000 сум</span>
                </div>

                <div className="bg-white p-3 rounded-md flex justify-between text-sm">
                  <span>PM86</span>
                  <span className="text-muted-foreground">1x</span>
                  <span className="font-medium">1 500 000 сум</span>
                </div>
              </div>
            </div>

            {/* Buttons moved inside the form for correct behavior */}
            <div className="w-full col-span-2 flex flex-col md:flex-row gap-4 mt-10 justify-center">
              <Button
                variant="outline"
                type="button"
                className="h-11 w-full md:w-[200px] border"
                onClick={() => form.reset()}
              >
                Отменить
              </Button>
              <Button
                type="submit"
                className="h-11 w-full md:w-[200px] bg-black text-white"
              >
                Подтвердить
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
