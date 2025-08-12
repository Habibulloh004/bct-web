"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Minimize2, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      text: "Привет! Я ваш виртуальный помощник. Чем могу помочь?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Reset unread count when chat opens
  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  // Smart reply system (RU)
  const getSmartReply = (text) => {
    const t = text.toLowerCase().trim();

    const responses = {
      greeting: [
        "Здравствуйте! Чем могу помочь?",
        "Привет! С радостью отвечу на ваши вопросы.",
        "Добрый день! Подскажите, что вас интересует?",
      ],
      warranty: [
        "Для проверки гарантии введите серийный номер на странице «Проверка гарантии». Обычно гарантия 12–36 месяцев — зависит от товара.",
        "Срок гарантии зависит от модели. Проверьте по серийному номеру в разделе гарантии.",
      ],
      delivery: [
        "Доставка: по Ташкенту 1–2 рабочих дня, по регионам 2–5 рабочих дней.",
        "Если оформили заказ сегодня в Ташкенте — можем доставить уже завтра. По регионам 3–5 дней.",
      ],
      payment: [
        "Способы оплаты: Click, Payme, Uzcard, Humo, наличные и банковский перевод.",
        "Поддерживаем все популярные способы оплаты: Click/Payme, банковские карты и наличные.",
      ],
      price: [
        "Уточните, пожалуйста, название или код товара — сообщу актуальную цену.",
        "Для точной цены пришлите, пожалуйста, наименование товара.",
      ],
      contact: [
        "Свяжитесь с нами: +998 (90) 123-45-67 или email: info@company.uz.",
        "Колл-центр: 1009. Также можете написать здесь в чате — мы на связи.",
      ],
      help: [
        "Я могу помочь с:",
        "• Информацией о товарах",
        "• Ценами и акциями",
        "• Доставкой",
        "• Гарантией",
        "• Способами оплаты",
      ],
    };

    // Greeting detection
    if (/(привет|здравствуйте|добрый день|hi|hello)/i.test(t)) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }
    // Warranty detection
    if (/(гарант|серийн|warranty)/i.test(t)) {
      return responses.warranty[Math.floor(Math.random() * responses.warranty.length)];
    }
    // Delivery detection
    if (/(доставк|курьер|delivery)/i.test(t)) {
      return responses.delivery[Math.floor(Math.random() * responses.delivery.length)];
    }
    // Payment detection
    if (/(оплат|click|payme|карта|наличн|перевод|pay)/i.test(t)) {
      return responses.payment[Math.floor(Math.random() * responses.payment.length)];
    }
    // Price detection
    if (/(цена|стоим|price|сум|доллар)/i.test(t)) {
      return responses.price[Math.floor(Math.random() * responses.price.length)];
    }
    // Contact detection
    if (/(телефон|номер|почт|email|контакт)/i.test(t)) {
      return responses.contact[Math.floor(Math.random() * responses.contact.length)];
    }
    // Help detection
    if (/(помощ|как|что|help)/i.test(t)) {
      return responses.help.join("\n");
    }

    // Default replies
    const defaults = [
      "Пока не совсем понял запрос. Пожалуйста, уточните или спросите про: цену, доставку, гарантию, оплату.",
      "По этой теме нет точной информации. Позвоните, пожалуйста, по номеру +998 (90) 123-45-67.",
      "Хочу помочь, но не до конца понял вопрос. Напишите чуть подробнее.",
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

    setIsTyping(false);

    const botReply = {
      id: Date.now() + 1,
      role: "bot",
      text: getSmartReply(userMessage.text),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botReply]);
    setIsLoading(false);

    if (!isOpen) setUnreadCount((p) => p + 1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  };
  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };
  const toggleMinimize = () => setIsMinimized((s) => !s);

  const TypingIndicator = () => (
    <div className="flex justify-start mb-2">
      <div className="flex items-center px-4 py-2 bg-gray-100 rounded-2xl rounded-bl-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );

  const Message = ({ message }) => (
    <div
      className={cn("flex mb-3", message.role === "user" ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "flex max-w-[85%] gap-2",
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
            message.role === "user" ? "bg-gray-500 text-white" : "bg-gray-100 text-gray-600"
          )}
        >
          {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        <div
          className={cn(
            "px-4 py-2 rounded-2xl shadow-sm",
            message.role === "user"
              ? "bg-gray-500 text-white rounded-br-sm"
              : "bg-gray-100 text-gray-800 rounded-bl-sm"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
          <div
            className={cn(
              "text-xs mt-1 opacity-70",
              message.role === "user" ? "text-gray-100" : "text-gray-500"
            )}
          >
            {message.timestamp.toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Chat Launcher Button */}
      <div className="fixed bottom-2 md:bottom-6 right-2 md:right-6 z-[9999]">
        <button
          onClick={openChat}
          className={cn(
            "relative group w-12 h-12 rounded-full shadow-lg transition-all duration-300",
            "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
            "hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-300",
            isOpen && "scale-0 opacity-0 pointer-events-none"
          )}
          aria-label="Открыть чат поддержки"
        >
          <div className="absolute inset-0 rounded-full bg-gray-400 opacity-30 animate-ping" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </div>

          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-2rem)]",
            "transition-all duration-300 ease-out",
            "sm:w-[400px] max-sm:w-[calc(100vw-1rem)] max-sm:right-2 max-sm:bottom-2"
          )}
        >
          <div
            className={cn(
              "bg-white relative rounded-2xl shadow-2xl border border-gray-200 overflow-hidden",
              "backdrop-blur-sm bg-white/95",
              "transform transition-all duration-300 pt-12",
              isMinimized ? "h-16" : "max-h-[80vh]"
            )}
          >
            {/* Header */}
            <div className="z-20 absolute w-full top-0 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Виртуальный консультант</h3>
                  <p className="text-xs text-gray-100">В сети • Отвечает мгновенно</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMinimize}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label={isMinimized ? "Развернуть чат" : "Свернуть чат"}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Закрыть чат"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <div className="">
                {/* Messages Area */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto px-4 py-4 h-[360px] bg-gray-50/30"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {messages.map((m) => (
                    <Message key={m.id} message={m} />
                  ))}

                  {isTyping && <TypingIndicator />}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t bg-white p-4">
                  <div className="flex justify-center items-center gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Напишите сообщение..."
                        disabled={isLoading}
                        className={cn(
                          "w-full resize-none rounded-xl border border-gray-200 px-4 py-3 pr-12",
                          "focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent",
                          "placeholder:text-gray-400 text-sm leading-relaxed",
                          "max-h-20 min-h-10",
                          isLoading && "opacity-50 cursor-not-allowed"
                        )}
                        rows={1}
                      />
                    </div>

                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center transition-all",
                        "bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50",
                        "disabled:cursor-not-allowed hover:scale-105 active:scale-95",
                        "focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      )}
                      aria-label="Отправить сообщение"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {["Доставка", "Способы оплаты", "Гарантия", "Помощь"].map((action) => (
                      <button
                        key={action}
                        onClick={() => setInput(action)}
                        className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-full whitespace-nowrap transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
