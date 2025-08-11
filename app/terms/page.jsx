"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 max-w-5xl mx-auto px-4 py-12 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("terms.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            {t("terms.intro", "Ushbu xizmatdan foydalanish orqali siz quyidagi shartlarga rozilik bildirgan bo‘lasiz.")}
          </p>
          <Separator />
          <h3 className="text-lg font-semibold">{t("terms.sections.acceptance", "1. Foydalanish shartlarini qabul qilish")}</h3>
          <p>
            {t("terms.acceptanceContent", "Agar siz bu shartlarga rozi bo‘lmasangiz, iltimos, xizmatimizdan foydalanmang.")}
          </p>

          <h3 className="text-lg font-semibold">{t("terms.sections.changes", "2. O‘zgarishlar kiritish huquqi")}</h3>
          <p>
            {t("terms.changesContent", "Biz ushbu shartlarga istalgan vaqtda o‘zgartirish kiritish huquqiga egamiz. O‘zgarishlar sahifada e’lon qilinadi.")}
          </p>

          <h3 className="text-lg font-semibold">{t("terms.sections.limitation", "3. Mas'uliyatni cheklash")}</h3>
          <p>
            {t("terms.limitationContent", "Xizmatlar bilan bog‘liq har qanday bevosita yoki bilvosita yo‘qotishlar uchun biz javobgar emasmiz.")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
