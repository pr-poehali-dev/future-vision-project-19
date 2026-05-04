import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит перетяжка?",
    answer:
      "Стул — от 1 500 ₽, кресло — от 5 000 ₽, диван — от 10 000 ₽. Цены выше среднего, и мы это объясняем: за плечами более 15 лет работы, сотни выполненных заказов и только проверенные материалы. Дёшево — не значит хорошо, мы это знаем по опыту.",
  },
  {
    question: "Как долго делается перетяжка?",
    answer:
      "Стул или пуф — 3–5 дней. Кресло — 5–7 дней. Диван — 10–14 дней. Если срочно — обсудим индивидуально.",
  },
  {
    question: "Нужно ли везти мебель к вам?",
    answer:
      "Можно привезти мебель к нам в мастерскую самостоятельно. Бесплатная доставка от нас — при заказе от 5 стульев, 2 кресел или 4 пуфов. Работаем по всей Москве.",
  },
  {
    question: "Как выбрать ткань?",
    answer:
      "Три способа: приходите в мастерскую — там весь выбор образцов вживую. Или созвонимся по видеозвонку — покажем ткани на камеру, обсудим цвет и фактуру. Если удобнее — приезжайте на личную встречу, подберём вместе.",
  },
  {
    question: "Как сделать заказ?",
    answer:
      "Позвоните или напишите на +7 (929) 277-17-62 — опишите мебель или пришлите фото. Ответим быстро и запишем на удобное время.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}