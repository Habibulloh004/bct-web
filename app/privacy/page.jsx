"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 max-w-5xl mx-auto px-4 py-12 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("privacy.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            {t("privacy.intro", "Biz foydalanuvchilarning maxfiylik huquqlarini hurmat qilamiz. Ushbu siyosat sizning ma'lumotlaringiz qanday yig‘ilishi, ishlatilishi va himoya qilinishi haqida ma'lumot beradi.")}
          </p>
          <Separator />
          <h3 className="text-lg font-semibold">{t("privacy.sections.dataCollection", "1. Ma'lumotlarni yig‘ish")}</h3>
          <p>
            {t("privacy.dataCollectionContent", "Biz sizdan shaxsiy ma'lumotlarni (ism, telefon, email va h.k.) siz ro'yxatdan o'tganingizda yoki bizga murojaat qilganingizda yig'amiz.")}
          </p>

          <h3 className="text-lg font-semibold">{t("privacy.sections.usage", "2. Ma'lumotlardan foydalanish")}</h3>
          <p>
            {t("privacy.usageContent", "Yig'ilgan ma'lumotlar siz bilan aloqa qilish, xizmatlarimizni yaxshilash, va xavfsizlikni ta'minlash uchun ishlatiladi.")}
          </p>

          <h3 className="text-lg font-semibold">{t("privacy.sections.sharing", "3. Uchinchi tomonlar bilan almashish")}</h3>
          <p>
            {t("privacy.sharingContent", "Biz sizning ma'lumotlaringizni hech qachon uchinchi shaxslar bilan sotmaymiz. Faqat qonuniy talablar bo‘lsa yoki xavfsizlikni ta’minlash zarur bo‘lsa, ulashishimiz mumkin.")}
          </p>

          <h3 className="text-lg font-semibold">{t("privacy.sections.security", "4. Ma'lumotlaringiz xavfsizligi")}</h3>
          <p>
            {t("privacy.securityContent", "Biz ma'lumotlaringizni himoya qilish uchun barcha zaruriy texnik va tashkiliy choralarni ko‘ramiz.")}
          </p>

          <h3 className="text-lg font-semibold">{t("privacy.sections.rights", "5. Foydalanuvchi huquqlari")}</h3>
          <p>
            {t("privacy.rightsContent", "Siz bizdan o'zingiz haqingizdagi ma'lumotlarni ko‘rish, tahrirlash yoki o‘chirishni so‘rash huquqiga egasiz.")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
