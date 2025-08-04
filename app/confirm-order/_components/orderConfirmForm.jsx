"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/customFormField";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

export default function OrderConfirmForm() {
  const { t } = useTranslation();

  const OrderValidation = z.object({
    phone: z.string().min(13, t('confirmOrder.form.phone.validation') || "Введите номер телефона").max(14),
    paymentType: z.string().min(1,t('confirmOrder.form.phone.validation_type')|| "Выберите тип оплаты"),
  });

  const form = useForm({
    resolver: zodResolver(OrderValidation),
    defaultValues: {
      phone: "",
      paymentType: "",
    },
  });

  const onSubmit = (values) => {
    console.log("✅ Order submitted:", values);
  };

  const paymentOptions = [
    { label: t('confirmOrder.form.paymentType.options.cash'), value: "cash" },
    { label: t('confirmOrder.form.paymentType.options.card'), value: "card" },
    { label: t('confirmOrder.form.paymentType.options.online'), value: "online" },
  ];

  return (
    <div className="h-full w-11/12 max-w-[1200px] mx-auto pt-4">
      <div className="rounded-xl border p-4 md:p-6 lg:p-10 shadow-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Left: Form */}
              <div className="w-full lg:w-2/3 space-y-5">
                <h2 className="text-lg md:text-xl font-semibold">{t('confirmOrder.title')}</h2>

                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  placeholder={t('confirmOrder.form.phone.placeholder')}
                  label={t('confirmOrder.form.phone.label')}
                />

                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="paymentType"
                  label={t('confirmOrder.form.paymentType.label')}
                  placeholder={t('confirmOrder.form.paymentType.placeholder')}
                  className="w-full text-foreground"
                  options={paymentOptions}
                />
              </div>

              {/* Right: Order Summary */}
              <div className="w-full lg:w-1/3 bg-[#F9F9F9] p-4 md:p-6 rounded-lg space-y-3">
                <h3 className="text-center text-base font-semibold mb-2">{t('confirmOrder.yourOrder')}</h3>

                <div className="bg-white p-3 rounded-md flex justify-between text-sm">
                  <span>PM86</span>
                  <span className="text-muted-foreground">2x</span>
                  <span className="font-medium">3 000 000 {t('common.currency')}</span>
                </div>

                <div className="bg-white p-3 rounded-md flex justify-between text-sm">
                  <span>PM86</span>
                  <span className="text-muted-foreground">1x</span>
                  <span className="font-medium">1 500 000 {t('common.currency')}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                type="button"
                className="h-11 w-full sm:w-[200px] border order-2 sm:order-1"
                onClick={() => form.reset()}
              >
                {t('confirmOrder.buttons.cancel')}
              </Button>
              <Button
                type="submit"
                className="h-11 w-full sm:w-[200px] bg-black text-white order-1 sm:order-2"
              >
                {t('confirmOrder.buttons.confirm')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}