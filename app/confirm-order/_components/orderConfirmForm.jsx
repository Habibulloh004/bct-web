"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/customFormField";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { useCartStore } from "@/store/useCartStore";
import { getTranslatedValue } from "@/lib/functions";
import { formatNumber, getInitialsFromName } from "@/lib/utils";
import { createOrder } from "@/actions/post";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderConfirmForm() {
  const { t, i18n } = useTranslation();
  const { items, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false); // New state for success
  const [orderData, setOrderData] = useState(null); // Store order data
  const router = useRouter();

  const OrderValidation = z.object({
    phone: z.string().min(13, t('confirmOrder.form.phone.validation') || "Введите номер телефона").max(14),
    paymentType: z.string().min(1, t('confirmOrder.form.phone.validation_type') || "Выберите тип оплаты"),
  });

  const form = useForm({
    resolver: zodResolver(OrderValidation),
    defaultValues: {
      phone: "",
      paymentType: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("✅ Order form values:", values);
    console.log("✅ Cart items:", items);

    // Validate that we have items in cart
    if (!items || items.length === 0) {
      toast.error(t('confirmOrder.errors.noItems') || 'Корзина пуста', {
        description: t('confirmOrder.errors.noItemsDesc') || 'Добавьте товары в корзину перед оформлением заказа'
      });
      return;
    }

    setIsLoading(true);

    // Create loading toast
    const loadingToastId = toast.loading(
      t('confirmOrder.toast.loading.title') || 'Создание заказа...',
      {
        description: t('confirmOrder.toast.loading.description') || 'Пожалуйста, подождите'
      }
    );

    try {
      // Prepare products array in the format expected by backend
      const products = items.map((item) => ({
        product_id: item.id, // Make sure this matches your item structure
        count: item.count || 1
      }));

      console.log("✅ Prepared products for backend:", products);

      // Create FormData for server action
      const formData = new FormData();
      formData.append("phone", values.phone.trim());
      formData.append("pay_type", values.paymentType);
      formData.append("products", JSON.stringify(products)); // Convert to JSON string
      formData.append("client_id", ""); // Empty for guest orders

      console.log("✅ FormData contents:", {
        phone: values.phone.trim(),
        pay_type: values.paymentType,
        products: JSON.stringify(products),
        client_id: ""
      });

      const response = await createOrder(formData);
      console.log("✅ Server response:", response);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      if (response && response.success) {
        console.log('✅ Order created successfully:', response.data);

        // Show success toast
        toast.success(
          t('confirmOrder.toast.success.title') || 'Заказ создан!',
          {
            description: t('confirmOrder.toast.success.description') || 'Ваш заказ успешно создан. Мы свяжемся с вами в ближайшее время.',
            duration: 4000,
          }
        );

        // Store order data and show success screen
        setOrderData({
          phone: values.phone,
          paymentType: values.paymentType,
          items: [...items],
          totalAmount: items.reduce((total, item) => total + (item.price * item.count), 0)
        });

        // Clear cart and reset form
        clearCart();
        form.reset();

        // Show success screen
        setOrderSuccess(true);

      } else {
        const errorMessage = response?.error || 'Не удалось создать заказ. Попробуйте еще раз.';
        console.error('❌ Order creation failed:', errorMessage);

        throw new Error(errorMessage);
      }

    } catch (error) {
      console.error('❌ Order creation error:', error);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Determine error message
      let errorMessage = 'Не удалось создать заказ. Попробуйте еще раз.';

      if (error.message) {
        errorMessage = error.message;
      }

      // Show specific error messages
      if (errorMessage.toLowerCase().includes('phone')) {
        errorMessage = t('confirmOrder.errors.invalidPhone') || 'Неверный формат номера телефона';
      } else if (errorMessage.toLowerCase().includes('products')) {
        errorMessage = t('confirmOrder.errors.invalidProducts') || 'Ошибка в данных товаров';
      } else if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('fetch')) {
        errorMessage = t('confirmOrder.errors.network') || 'Ошибка сети. Проверьте подключение к интернету.';
      }

      // Show error toast
      toast.error(
        t('confirmOrder.toast.error.title') || 'Ошибка создания заказа',
        {
          description: errorMessage,
          duration: 5000,
        }
      );

    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnToMenu = () => {
    setOrderSuccess(false);
    setOrderData(null);
    router.push('/'); // Navigate to home page
  };

  const paymentOptions = [
    { label: t('confirmOrder.form.paymentType.options.cash') || 'Наличными', value: "cash" },
    { label: t('confirmOrder.form.paymentType.options.card') || 'Картой', value: "card" },
    { label: t('confirmOrder.form.paymentType.options.online') || 'Онлайн', value: "online" },
  ];

  // Calculate total
  const totalAmount = items?.reduce((total, item) => total + (item.price * item.count), 0) || 0;

  // Success Screen
  if (orderSuccess) {
    return (
      <div className="h-full w-11/12 max-w-[800px] mx-auto pt-4">
        <div className="rounded-xl border p-4 md:p-6 lg:p-10 shadow-sm text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
            {t('confirmOrder.success.title') || 'Заказ принят!'}
          </h2>

          {/* Success Message */}
          <p className="text-gray-600 mb-6 text-lg">
            {t('confirmOrder.success.message') || 'Ваш заказ успешно оформлен. Наш менеджер свяжется с вами в ближайшее время для подтверждения.'}
          </p>

          {/* Order Summary */}
          {orderData && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-3 text-center">
                {t('confirmOrder.success.orderSummary') || 'Детали заказа'}
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t('confirmOrder.form.phone.label') || 'Номер телефона:'}
                  </span>
                  <span className="font-medium">{orderData.phone}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t('confirmOrder.form.paymentType.label') || 'Способ оплаты:'}
                  </span>
                  <span className="font-medium">
                    {paymentOptions.find(opt => opt.value === orderData.paymentType)?.label}
                  </span>
                </div>

                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-gray-600">
                    {t('confirmOrder.total') || 'Итого:'}
                  </span>
                  <span className="font-bold text-lg">
                    {formatNumber(orderData.totalAmount)} {t('common.currency') || 'сум'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>{t('confirmOrder.success.contactInfo') || 'Контактная информация:'}</strong>
            </p>
            <p className="text-sm text-blue-700 mt-1">
              {t('confirmOrder.success.contactDetails') || 'Если у вас есть вопросы, звоните: +998 (71) 123-45-67'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleReturnToMenu}
              className="h-12 px-8 bg-black text-white hover:bg-gray-800 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              {t('confirmOrder.success.returnToMenu') || 'Вернуться в меню'}
            </Button>

            {/* <Button
              onClick={() => router.push('/catalog')}
              variant="outline"
              className="h-12 px-8 border-gray-300 hover:bg-gray-50"
            >
              {t('confirmOrder.success.continueShopping') || 'Продолжить покупки'}
            </Button> */}
          </div>
        </div>
      </div>
    );
  }

  // Original Order Form
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
                <h2 className="text-lg md:text-xl font-semibold">
                  {t('confirmOrder.title') || 'Подтверждение заказа'}
                </h2>

                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  placeholder={t('confirmOrder.form.phone.placeholder') || 'Введите номер телефона'}
                  label={t('confirmOrder.form.phone.label') || 'Номер телефона'}
                  disabled={isLoading}
                />

                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="paymentType"
                  label={t('confirmOrder.form.paymentType.label') || 'Способ оплаты'}
                  placeholder={t('confirmOrder.form.paymentType.placeholder') || 'Выберите способ оплаты'}
                  className="w-full text-foreground"
                  options={paymentOptions}
                  disabled={isLoading}
                />

                {/* Order summary info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>{t('confirmOrder.info.title') || 'Информация:'}</strong>
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    {t('confirmOrder.info.description') || 'После создания заказа с вами свяжется наш менеджер для уточнения деталей.'}
                  </p>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="w-full lg:w-1/3 bg-[#F9F9F9] p-4 md:p-6 rounded-lg space-y-3">
                <h3 className="text-center text-base font-semibold mb-2">
                  {t('confirmOrder.yourOrder') || 'Ваш заказ'}
                </h3>

                {items?.length > 0 ? (
                  <>
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-md p-3 flex justify-between items-center"
                      >
                        <div className="flex-1">
                          <span className="text-sm font-medium">
                            {getInitialsFromName(getTranslatedValue(item.name, i18n.language))}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm">{item.count}x</span>
                          <span className="font-medium text-sm">
                            {formatNumber(item.price * item?.count)} {t('common.currency') || 'сум'}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center font-semibold">
                        <span>{t('confirmOrder.total') || 'Итого:'}</span>
                        <span className="text-lg">
                          {formatNumber(totalAmount)} {t('common.currency') || 'сум'}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-sm text-gray-500">
                    {t('confirmOrder.noItems') || 'Корзина пуста'}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                type="button"
                className="h-11 w-full sm:w-[200px] border order-2 sm:order-1"
                onClick={() => form.reset()}
                disabled={isLoading}
              >
                {t('confirmOrder.buttons.cancel') || 'Отмена'}
              </Button>
              <Button
                type="submit"
                className="h-11 w-full sm:w-[200px] bg-black text-white order-1 sm:order-2 disabled:opacity-50"
                disabled={isLoading || !items?.length}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {isLoading
                  ? (t('confirmOrder.buttons.creating') || 'Создание...')
                  : (t('confirmOrder.buttons.confirm') || 'Подтвердить заказ')
                }
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}