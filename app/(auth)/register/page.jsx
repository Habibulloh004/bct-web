"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/customFormField";
import { registerUser } from "@/actions/post";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { t, ready } = useTranslation();
  const router = useRouter();
  const { setUser } = useUserStore();
  
  // Dynamic validation schema with translations
  const RegisterValidation = useMemo(() => {
    if (!ready) return z.object({}); // Return empty schema if translations not ready

    return z.object({
      name: z.string().min(2, { message: t('register.form.name.validation.min') }).max(50, { message: t('register.form.name.validation.max') }),
      email: z.string().email({ message: t('register.form.email.validation.invalid') }),
      phone: z.string().min(13, { message: t('register.form.phone.validation.short') }).max(14, { message: t('register.form.phone.validation.long') }),
      password: z.string().min(6, { message: t('register.form.password.validation.min') }).max(100, { message: t('register.form.password.validation.max') }),
      agree: z.boolean().refine((value) => value === true, {
        message: t('register.form.agree.validation.required'),
      }),
    });
  }, [t, ready]);

  const form = useForm({
    resolver: zodResolver(RegisterValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      agree: false,
    },
  });

  const onSubmit = async (values) => {
    console.log("Form submitted:", values);
    setIsLoading(true);

    // Loading toast with translation
    const loadingToast = toast.loading(t('register.toast.loading.title'), {
      description: t('register.toast.loading.description')
    });

    try {
      // FormData yaratish (server action uchun)
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('password', values.password);

      // Server action chaqirish
      const result = await registerUser(formData);
      console.log("Registration result:", result);
      
      if (result.success) {
        console.log('Client created successfully:', result.data);

        // ✅ Zustand store'ga saqlash (localStorage o'rniga)
        if (result.data) {
          setUser(result.data);
        }

        // Loading toast'ni dismiss qilish
        toast.dismiss(loadingToast);

        // Success toast with translation
        toast.success(t('register.toast.success.title'), {
          description: t('register.toast.success.description'),
          duration: 4000,
        });

        // Formani tozalash
        form.reset();
        
        // Profile sahifasiga yo'naltirish (login o'rniga)
        router.push("/profile");

      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      console.error('Registration error:', error);

      // Loading toast'ni dismiss qilish
      toast.dismiss(loadingToast);

      // Error toast with translation
      toast.error(t('register.toast.error.title'), {
        description: error.message || t('register.toast.error.description'),
        duration: 5000,
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-8 h-full w-11/12 max-w-[1440px] mx-auto md:px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full sm:w-4/5 md:w-3/5 lg:w-4/7 xl:w-[50%] mx-auto border-[rgba(255, 255, 255, 1)] border md:border-2 p-4 sm:p-8 md:p-12 lg:p-20 rounded-md">
        <h1 className="text-xl sm:text-2xl md:text-3xl w-full text-center mb-6 sm:mb-8">
          {t('register.title')}
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 sm:space-y-5 md:space-y-6"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              placeholder={t('register.form.name.placeholder')}
              label={t('register.form.name.label')}
              inputClass="rounded-md border-[1px] h-10 sm:h-11 md:h-12 text-foreground w-full px-3 sm:px-4"
              disabled={isLoading}
            />

            <CustomFormField
              fieldType={FormFieldType.EMAIL}
              control={form.control}
              name="email"
              placeholder={t('register.form.email.placeholder')}
              label={t('register.form.email.label')}
              inputClass="rounded-md border-[1px] h-10 sm:h-11 md:h-12 text-foreground w-full px-3 sm:px-4"
              disabled={isLoading}
            />

            <CustomFormField
              fieldType={FormFieldType.PASSWORDINPUT}
              control={form.control}
              name="password"
              placeholder={t('register.form.password.placeholder')}
              label={t('register.form.password.label')}
              inputClass="rounded-md border-[1px] h-10 sm:h-11 md:h-12 text-foreground w-full px-3 sm:px-4"
              disabled={isLoading}
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              placeholder={t('register.form.phone.placeholder')}
              label={t('register.form.phone.label')}
              inputClass="w-full"
              disabled={isLoading}
            />

            {/* Checkbox for terms and conditions */}
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="agree"
              label={
                <span className="text-sm sm:text-base">
                  {t('register.form.agree.label.prefix')}{' '}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    {t('register.form.agree.label.terms')}
                  </Link>
                  {' '}{t('register.form.agree.label.and')}{' '}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    {t('register.form.agree.label.privacy')}
                  </Link>
                </span>
              }
              disabled={isLoading}
            />

            <div className="w-full flex justify-center items-center flex-col gap-3 sm:gap-4 pt-4 sm:pt-6">
              <div className="flex gap-2 justify-center items-center">
                <p className="text-sm sm:text-base">{t('register.buttons.haveAccount')}</p>
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline"
                >
                  {t('login.buttons.submit')}
                </Link>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="text-white bg-primary hover:bg-primary/80 w-full sm:min-w-1/2 md:w-auto md:min-w-[200px] p-2 sm:p-3 md:p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-200"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoading ? t('register.buttons.submitting') : t('register.buttons.submit')}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}