"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/customFormField";
import { toast } from "sonner";

export default function Contact() {
  const { t,i18n } = useTranslation();

  const ContactSchema = useMemo(() =>
    z.object({
      name: z.string().min(2, { message: t("contact.validation.name") }),
      phone: z.string().min(9, { message: t("contact.validation.phone") }),
      message: z.string().min(5, { message: t("contact.validation.message") }),
    }), [t]
  );

  const form = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    const toastId = toast.loading(t("contact.sending"));
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      toast.success(t("contact.success"), { id: toastId });
      form.reset();
    } catch {
      toast.error(t("contact.error"), { id: toastId });
    }
  };

  
const mapLang = useMemo(() => {
  switch (i18n.language) {
    case "uz":
      return "uz_UZ";
    case "ru":
      return "ru_RU";
    case "en":
    default:
      return "en_US";
  }
}, [i18n.language]);

const mapSrc = `https://yandex.com/map-widget/v1/?um=constructor%3Aec2b7bd9dcb27e82e92ec58d77cb617e23b497bd2c4473453cd1b1c12f0de3e3&source=constructor&lang=${mapLang}`;


  return (
    <div className=" max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">{t("contact.title")}</h1>
        <p className="text-muted-foreground">{t("contact.description")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              placeholder={t('register.form.name.placeholder')}
              label={t('register.form.name.label')}
              inputClass="rounded-md border-[1px] h-10 sm:h-11 md:h-12 text-foreground w-full px-3 sm:px-4"
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label={t("contact.form.phone")}
              placeholder={t("contact.form.phone")}
            />
          </div>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="message"
            label={t("contact.form.message")}
            placeholder={t("contact.form.message")}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {t("contact.send")}
          </Button>
        </form>
      </Form>

      <div className="mt-12 rounded-md border overflow-hidden">
        <iframe
          src={mapSrc}
          width="100%"
          height="400"
          frameBorder="0"
          title="Map"
        />
      </div>
    </div>
  );
}
