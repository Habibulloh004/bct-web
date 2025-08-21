"use client";

import React from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { formatNumber, getInitialsFromName } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, CreditCard } from "lucide-react";
import { getTranslatedValue } from "@/lib/functions";

export default function OrderHistorySection() {
  const { t ,i18n} = useTranslation();
  const orders = useOrderStore((state) => state.orders);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h2 className="text-xl font-semibold mb-6">
        {t("profile.sections.order_history") || "Order History"}
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>{t("profile.no_orders") || "No orders found"}</p>
          <Button className="mt-4" onClick={() => (window.location.href = "/")}>
            {t("profile.buttons.start_shopping") || "Start Shopping"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 bg-[#FAFAFA] shadow-sm"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{order.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="capitalize">{order.paymentType}</span>
                </div>

                {order.created_at && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Products list */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border rounded-md p-3 flex justify-between items-center"
                  >
                    <span className="text-sm font-medium">
                      {getInitialsFromName(getTranslatedValue(item.name, i18n.language))}

                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{item.count}x</span>
                      <span className="text-sm font-semibold">
                        {formatNumber(item.price * item.count)} {t("common.currency") || "сум"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="text-right font-semibold text-base mt-4">
                {t("confirmOrder.total") || "Total"}{" "}
                {formatNumber(order.totalAmount)} {t("common.currency") || "сум"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
