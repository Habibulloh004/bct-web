"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/customFormField";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';
import { loginUser } from "@/actions/post";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  // Dynamic validation schema with translations
  const LoginValidation = z.object({
    phone: z
      .string()
      .min(13, { message: t('login.form.phone.validation.short') })
      .max(14, { message: t('login.form.phone.validation.long') }),

    password: z
      .string()
      .min(6, { message: t('login.form.password.validation.min') }),
  });

  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("Form submitted:", values);
    setIsLoading(true);
    
    // Loading toast
    const loadingToast = toast.loading(t('login.toast.loading.title'), {
      description: t('login.toast.loading.description')
    });
    
    try {
      // FormData yaratish (server action uchun)
      const formData = new FormData();
      formData.append('phone', values.phone);
      formData.append('password', values.password);

      // Server action chaqirish
      const result = await loginUser(formData);
      
      if (result.success) {
        console.log('User logged in successfully:', result.data);
        
        // Loading toast'ni dismiss qilish
        toast.dismiss(loadingToast);
        
        // Success toast
        toast.success(t('login.toast.success.title'), {
          description: t('login.toast.success.description'),
          duration: 4000,
        });
        
        // Formani tozalash
        form.reset();
        
        // Redirect to dashboard or home page
        // window.location.href = '/dashboard'; // yoki Next.js router ishlatishingiz mumkin
        
      } else {
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Loading toast'ni dismiss qilish
      toast.dismiss(loadingToast);
      
      // Error toast
      toast.error(t('login.toast.error.title'), {
        description: error.message || t('login.toast.error.description'),
        duration: 5000,
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 h-full w-11/12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-4/7 xl:w-[50%] mx-auto border-[rgba(255, 255, 255, 1)] border-2 p-4 sm:p-8 md:p-12 lg:p-20 rounded-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl w-full text-center mb-2">
            {t('login.title')}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {t('login.subtitle')}
          </p>
        </div>
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 sm:space-y-5 md:space-y-6"
          >
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              placeholder={t('login.form.phone.placeholder')}
              label={t('login.form.phone.label')}
              inputClass="text-foreground w-full"
              disabled={isLoading}
            />

            <CustomFormField
              fieldType={FormFieldType.PASSWORDINPUT}
              control={form.control}
              name="password"
              placeholder={t('login.form.password.placeholder')}
              label={t('login.form.password.label')}
              inputClass="text-foreground rounded-md border-[1px] h-10 sm:h-11 md:h-12 w-full px-3 sm:px-4"
              disabled={isLoading}
            />

            <div className="w-full flex justify-center items-center flex-col gap-3 sm:gap-4 pt-4 sm:pt-6">
              {/* Register Link */}
              <p className="text-sm sm:text-base text-center text-gray-600">
                {t('login.buttons.noAccount')}{" "}
                <Link 
                  href="/register" 
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                >
                  {t('login.buttons.register')}
                </Link>
              </p>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="text-white bg-black hover:bg-black/80 w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px] p-2 sm:p-3 md:p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-200"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoading ? t('login.buttons.submitting') : t('login.buttons.submit')}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}