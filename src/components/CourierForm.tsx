import { useState } from "react"
import Icon from "@/components/ui/icon"

const TIME_SLOTS = [
  "09:00 – 11:00",
  "11:00 – 13:00",
  "13:00 – 15:00",
  "15:00 – 17:00",
  "17:00 – 19:00",
]

function getAvailableDates() {
  const dates: { label: string; value: string }[] = []
  const today = new Date()
  for (let i = 1; i <= 10; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const weekday = d.toLocaleDateString("ru-RU", { weekday: "short" })
    const day = d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
    dates.push({
      label: `${weekday}, ${day}`,
      value: d.toISOString().split("T")[0],
    })
  }
  return dates
}

interface CourierFormProps {
  variant?: "dark" | "light"
}

export function CourierForm({ variant = "light" }: CourierFormProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    comment: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const dates = getAvailableDates()

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const canNext = () => {
    if (step === 1) return form.name.trim() && form.phone.trim() && form.address.trim()
    if (step === 2) return form.date && form.time
    return true
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setStep(1)
      setSubmitted(false)
      setForm({ name: "", phone: "", address: "", date: "", time: "", comment: "" })
    }, 300)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-sm tracking-wide transition-colors duration-300 ${
          variant === "dark"
            ? "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            : "bg-foreground text-primary-foreground hover:bg-foreground/80"
        }`}
      >
        <Icon name="Truck" size={16} />
        Вызвать курьера
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

          <div className="relative bg-background w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Вызов курьера</p>
                <h3 className="text-xl font-medium">
                  {submitted ? "Заявка принята!" : step === 1 ? "Ваши данные" : "Выберите время"}
                </h3>
              </div>
              <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCheck" size={28} />
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Мы свяжемся с вами по номеру <span className="text-foreground font-medium">{form.phone}</span>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Курьер приедет {dates.find((d) => d.value === form.date)?.label?.replace(/^[а-яё]+,\s*/i, "")} в {form.time}
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 w-full bg-foreground text-primary-foreground py-3 text-sm tracking-wide hover:bg-foreground/80 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              ) : step === 1 ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs tracking-wide uppercase text-muted-foreground block mb-1.5">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Как вас зовут?"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-wide uppercase text-muted-foreground block mb-1.5">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-wide uppercase text-muted-foreground block mb-1.5">Адрес в Москве</label>
                    <input
                      type="text"
                      placeholder="Улица, дом, квартира"
                      value={form.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-wide uppercase text-muted-foreground block mb-1.5">Что перетянуть? (необязательно)</label>
                    <textarea
                      placeholder="Например: угловой диван, 2 кресла"
                      value={form.comment}
                      onChange={(e) => handleChange("comment", e.target.value)}
                      rows={2}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                    />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!canNext()}
                    className="w-full bg-foreground text-primary-foreground py-3 text-sm tracking-wide hover:bg-foreground/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Выбрать время
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs tracking-wide uppercase text-muted-foreground block mb-3">Дата</label>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                      {dates.map((d) => (
                        <button
                          key={d.value}
                          onClick={() => handleChange("date", d.value)}
                          className={`px-4 py-2.5 text-sm border text-left transition-colors ${
                            form.date === d.value
                              ? "border-foreground bg-foreground text-primary-foreground"
                              : "border-border hover:border-foreground"
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs tracking-wide uppercase text-muted-foreground block mb-3">Время</label>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleChange("time", slot)}
                          className={`px-3 py-2.5 text-sm border transition-colors ${
                            form.time === slot
                              ? "border-foreground bg-foreground text-primary-foreground"
                              : "border-border hover:border-foreground"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-border py-3 text-sm tracking-wide hover:border-foreground transition-colors"
                    >
                      Назад
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!canNext()}
                      className="flex-1 bg-foreground text-primary-foreground py-3 text-sm tracking-wide hover:bg-foreground/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Подтвердить
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!submitted && (
              <div className="px-6 pb-4 flex gap-2">
                <div className={`h-0.5 flex-1 transition-colors ${step >= 1 ? "bg-foreground" : "bg-border"}`} />
                <div className={`h-0.5 flex-1 transition-colors ${step >= 2 ? "bg-foreground" : "bg-border"}`} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}