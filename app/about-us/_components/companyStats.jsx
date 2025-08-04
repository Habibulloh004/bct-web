import React from "react";
import Image from "next/image";

const statsTop = [
  {
    value: "14",
    label: "лет на рынке Узбекистана",
    icon: "/stats/1.png",
  },
  {
    value: "1000+",
    label: "довольных клиентов",
    icon: "/stats/2.png",
  },
  {
    value: "50+",
    label: "вендоров-партнёров",
    icon: "/stats/3.png",
  },
  {
    value: "170",
    label: "единиц оборудования",
    icon: "/stats/4.png",
  },
];

const statsBottom = [
  {
    value: "10000+",
    label: "сканеров штрих-кода",
    icon: "/stats/5.png",
  },
  {
    value: "3000+",
    label: "весов",
    icon: "/stats/6.png",
  },
  {
    value: "5000+",
    label: "принтеров (чек, этикеток)",
    icon: "/stats/7.png",
  },
  {
    value: "1000+",
    label: "рабочих мест кассира",
    icon: "/stats/8.png",
  },
];

const CompanyStats = () => {
  return (
    <div
      className="bg-cover bg-center py-16 text-white"
      style={{
        backgroundImage: "url('/images/background1.jpg')", // 🔁 joylashtiring
      }}
    >
      <div className="max-w-7xl w-11/12 mx-auto space-y-12">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          Компания В Цифрах
        </h2>

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsTop.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white text-black p-5 rounded-xl shadow flex items-center justify-between min-h-36"
            >
              <div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm mt-1">{stat.label}</p>
              </div>
              <Image
                src={stat.icon}
                alt={stat.label}
                width={75}
                height={75}
              />
            </div>
          ))}
        </div>


        <h2 className="text-center text-2xl font-semibold mt-10">
          Продано за все время
        </h2>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsBottom.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white text-black p-5 rounded-xl shadow flex items-center justify-between min-h-36"
            >
              <div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm mt-1">{stat.label}</p>
              </div>
              <Image
                src={stat.icon}
                alt={stat.label}
                width={75}
                height={75}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;
