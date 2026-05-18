import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  ChevronUp, 
  CheckCircle2, 
  MapPin, 
  Menu, 
  X, 
  Heart, 
  Stethoscope, 
  Activity, 
  Users, 
  Utensils, 
  Bath, 
  Scissors, 
  Truck,
  Sparkles,
  ShieldCheck,
  Home,
  UserCheck,
  Navigation,
  ChevronLeft, 
  ChevronRight,
  Clock
} from 'lucide-react';
import logo from './assets/logo.png'

const THEME = {
  colors: {
    primary: 'bg-[#7FB069]',
    secondary: 'bg-[#76C1C1]',
    accent: 'text-[#D4AF37]',
    glass: 'bg-white/70 backdrop-blur-md border border-white/30',
  }
};

const SERVICES = [
  { icon: Activity, title: "Программа реабилитации", desc: "После операции: сердце, замена сустава, инсульта, восстановление движения конечностей" },
  { icon: Stethoscope, title: "Медицинские процедуры", desc: "Квалифицированный медицинский уход и манипуляции" },
  { icon: UserCheck, title: "Наблюдение терапевта", desc: "Регулярный мониторинг состояния здоровья врачом" },
  { icon: Activity, title: "ЛФК", desc: "Лечебная физическая культура для восстановления" },
  { icon: Utensils, title: "4-разовое питание", desc: "Сбалансированное и полноценное меню" },
  { icon: Sparkles, title: "Уборка комнат", desc: "Влажная уборка жилой комнаты 4 раза в день" },
  { icon: Bath, title: "Ванные процедуры", desc: "Помощь в принятии душа и ванны" },
  { icon: Activity, title: "Умывание", desc: "Помощь в ежедневных гигиенических процедурах" },
  { icon: Scissors, title: "Стрижка", desc: "Услуги парикмахера для опрятного вида" },
  { icon: Truck, title: "Трансфер", desc: "До пансионата на специальной машине" },
  { icon: UserCheck, title: "Бритье", desc: "Уход за бородой и усами" },
  { icon: Scissors, title: "Стрижка ногтей", desc: "Гигиенический уход за руками и ногами" },
  { icon: ShieldCheck, title: "Стирка белья", desc: "Регулярная стирка одежды и постельного белья" },
  { icon: ShieldCheck, title: "Глажка", desc: "Утюжка вещей для комфорта проживающих" },
  { icon: Bath, title: "Подмывание", desc: "Деликатный гигиенический уход" },
  { icon: Sparkles, title: "Массаж", desc: "Профессиональный оздоровительный массаж" },
];

const ROOMS = [ { url: "/1.jpeg", title: "Уютные комнаты" }, 
  { url: "/2.jpeg", title: "Комфортная атмосфера" }, 
  { url: "/3.jpeg", title: "Домашний уют" },
   { url: "/4.jpeg", title: "Современный уход" }, 
   { url: "/5.jpeg", title: "Домашний уют" }, 
   { url: "/6.jpeg", title: "Современный уход" }, 
   { url: "/7.jpeg", title: "Домашний уют" }, 
   { url: "/8.jpeg", title: "Современный уход" }, 
   { url: "/10.jpeg", title: "Домашний уют" }, 
   { url: "/11.jpeg", title: "Современный уход" }, 
   { url: "/12.jpeg", title: "Домашний уют" }, 
   { url: "/13.jpeg", title: "Современный уход" }, ];

const SectionTitle = ({ children, subtitle }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && <p className="text-slate-500 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const galleryRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 480 : window.innerWidth * 0.85;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e) => {
    isDown.current = true;
    galleryRef.current.classList.add('cursor-grabbing');
    startX.current = e.pageX - galleryRef.current.offsetLeft;
    scrollLeft.current = galleryRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (galleryRef.current) galleryRef.current.classList.remove('cursor-grabbing');
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (galleryRef.current) galleryRef.current.classList.remove('cursor-grabbing');
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 mb-4"
        >
          <div className="w-full h-full border-4 border-[#7FB069] border-t-transparent rounded-full" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-xl font-semibold text-[#7FB069]"
        >
          Гармония жизни
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFD] text-slate-800 font-sans selection:bg-[#7FB069]/30">
      {}
     <header className="fixed w-full top-0 z-50 px-4 md:px-8 py-4">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`mx-auto max-w-7xl px-3 py-2 rounded-3xl ${THEME.colors.glass} flex justify-between items-center shadow-lg shadow-black/5`}
        >
          <div className="hidden md:flex items-center gap-2">
          <img
  src={logo}
  alt="Гармония жизни"
  className="w-25 h-25 object-contain"
/>
           
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#services" className="hover:text-[#7FB069] transition-colors">Услуги</a>
            <a href="#gallery" className="hover:text-[#7FB069] transition-colors">Галерея</a>
            <a href="#about" className="hover:text-[#7FB069] transition-colors">О нас</a>
            <a 
              href="tel:87711382025" 
              className="bg-[#7FB069] text-white px-6 py-2 rounded-2xl hover:bg-[#6A9A56] transition-all shadow-md shadow-[#7FB069]/20"
            >
              8 747 670 80 25
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </button>
        </motion.nav>
      </header>

      {}
       <section className="relative h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 bg-[url('/back.png')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 leading-tight">
                Гармония <br />
                <span className="text-[#7FB069]">жизни</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-slate-600 mb-6 italic">
                «Мы дарим спокойствие»
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-2lg">
Наш дом престарелых расположен недалеко от города — в тихом, уютном месте с чистым воздухом и спокойной атмосферой. Небольшое количество постояльцев позволяет нам уделять каждому максимум внимания, заботы и тепла, создавая по-настоящему домашнюю обстановку. Мы формируем комфортную среду, где каждый чувствует себя в безопасности, окружённым уважением, заботой и качественным уходом.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#7FB069] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#7FB069]/30">
                  Связаться с нами
                </button>
                <button className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-lg">
                  Посмотреть комнаты
                </button>
              </div>

              <div className="mt-8 flex items-center gap-3 text-slate-600 font-semibold">
                <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded-full text-[#D4AF37]">
                  <Phone size={24} />
                </div>
                <a href="tel:87711382025" className="text-2xl hover:text-[#7FB069] transition-colors">8 747 670 80 25</a>
              </div>
            </motion.div>
          </div>


        </div>
      </section>
      {}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Комплексный уход и медицинская поддержка для комфортной жизни">
            Наши Услуги
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-[#7FB069]/30 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#7FB069] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-800">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="gallery" className="py-24 bg-[#F8FAFC] scroll-mt-20 overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">Галерея комфорта</h2>
              <p className="text-slate-500 text-lg max-w-xl">Уютная обстановка нашего пансионата</p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => scrollGallery('left')}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#7FB069] hover:text-white transition-all text-slate-600"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scrollGallery('right')}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#7FB069] hover:text-white transition-all text-slate-600"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={galleryRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-6 overflow-x-auto pb-12 px-6 md:px-[10%] no-scrollbar snap-x snap-mandatory cursor-grab select-none active:cursor-grabbing"
        >
          {ROOMS.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[80vw] md:w-[400px] aspect-[3/4] relative overflow-hidden rounded-[2.5rem] shadow-xl snap-center"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <p className="text-white text-lg font-bold">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }} 
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
               >
                 <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                   Почему семьи <br /> доверяют нам?
                 </h2>
              
                 <div className="space-y-6">
                   {[
                    { title: "Наш дом престарелых расположен недалеко от города,", desc: "в тихом и уютном месте с чистым воздухом;", icon: Home },
                     { title: "Наш дом престарелых рассчитан на небольшое количество постояльцев, ", desc: "что позволяет создать уютную домашнюю атмосферу и обеспечить каждому качественный уход и душевное тепло.", icon: Users },
                     { title: "Забота 24/7", desc: "Круглосуточное наблюдение и помощь в любую минуту.", icon: Clock },
                     { title: "Опытный персонал", desc: "Медицинские работники со стажем более 10 лет.", icon: CheckCircle2 },
                     { title: "Реабилитация", desc: "Специальные условия для восстановления после операций.", icon: Activity }
                   ].map((benefit, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#76C1C1]/10 rounded-xl flex items-center justify-center text-[#76C1C1]">
                          <benefit.icon size={24} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-1 text-slate-800">{benefit.title}</h4>
                          <p className="text-slate-500">{benefit.desc}</p>
                        </div>
                     </div>
                   ))}
                 </div>
               </motion.div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="bg-[#7FB069] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[#7FB069]/20">
                  <p className="text-4xl font-bold mb-2">100+</p>
                  <p className="opacity-80">Гостей</p>
                </div>
                <div className="bg-slate-100 p-8 rounded-[2.5rem] text-slate-800">
                  <p className="text-4xl font-bold mb-2">15</p>
                  <p className="opacity-80">Профи</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-100 p-8 rounded-[2.5rem] text-slate-800">
                  <p className="text-4xl font-bold mb-2">10</p>
                  <p className="opacity-80">Лет опыта</p>
                </div>
                <div className="bg-[#D4AF37] p-8 rounded-[2.5rem] text-white shadow-xl shadow-[#D4AF37]/20">
                  <p className="text-4xl font-bold mb-2">24/7</p>
                  <p className="opacity-80">Уход</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 container mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden p-12 text-center text-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Подарите близким покой</h2>
            <p className="text-lg opacity-80 mb-10">Мы приглашаем вас на бесплатную экскурсию, чтобы вы могли увидеть всё своими глазами.</p>
            <div className="flex justify-between gap-4">
             <a href="tel:87711382025" className="bg-[#7FB069] px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 w-full">
                <Phone size={20} /> Позвонить
              </a>
             <a href="https://wa.me/87476708025" className="bg-green-500 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 w-full">
                <MessageCircle size={20} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="bg-slate-50 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-[#7FB069] rounded-xl flex items-center justify-center text-white">
                  <Heart size={24} fill="currentColor" />
                </div>
                <span className="font-bold text-xl">Гармония жизни</span>
              </div>
              <p className="text-slate-500 mb-8 max-w-sm">Ваше спокойствие — наша миссия. Мы создаем условия, в которых каждый чувствует себя как дома.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#7FB069] mt-1" size={20} />
                  <p>​с. Бесагаш, Талгарский район, Алматинская область</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-[#7FB069] mt-1" size={20} />
                  <p className="text-xl font-bold">8 747 670 80 25 , 8 707 443 43 13 </p>
                </div>
              </div>
              
              <a href="https://2gis.kz/almaty/gallery/geo/70030076187613251/photoId/30258560071009728" target="_blank" className="inline-flex items-center gap-2 bg-[#00AAFF] text-white px-6 py-3 rounded-xl font-bold">
                <Navigation size={18} /> Открыть в 2ГИС
              </a>
            </div>
            
            <div className="h-[350px] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.772591642878!2d76.94821631548443!3d43.25091767913702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836e94a82f913d%3A0xc3101c5f87b8d4e9!2z0YPQu9C40YbQsCDQqNC-0LrQsNC90LAg0JLQsNC70LjRhdCw0L3QvtCy0LAgNDMsINCQ0LvQvNCw0YLRiyAwNTAwMDA!5e0!3m2!1sru!2skz!4v1715520000000" 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                allowFullScreen="" 
                loading="lazy" 
              />
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
            © 2026 «Гармония жизни». Все права защищены.
          </div>
        </div>
      </footer>

      {}
{/* --- Кнопки связи --- */}
<div className="fixed bottom-6 left-6 z-50">
  <a href="tel:87711382025" className="w-14 h-14 bg-[#7FB069] shadow-xl rounded-full flex items-center justify-center text-white">
    <Phone size={24} />
  </a>
</div>

<div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
  <AnimatePresence>
    {showScrollTop && (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        onClick={scrollToTop}
        className="w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-[#7FB069] border border-slate-100"
      >
        <ChevronUp size={24} />
      </motion.button>
    )}
  </AnimatePresence>
  
  <a href="https://wa.me/87476708025" className="w-14 h-14 bg-green-500 shadow-xl rounded-full flex items-center justify-center text-white">
    <MessageCircle size={28} />
  </a>
</div>

      {}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex justify-end"
          >
             <motion.div 
                initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }}
                className="w-72 bg-white h-full p-8 flex flex-col shadow-2xl"
             >
                {/* LOGO */}
  <div className="mb-8 flex justify-center">
    <img src={logo} alt="logo" className="w-24 h-auto object-contain" />
  </div>
                <div className="flex justify-end mb-8">
                   <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 rounded-lg"><X /></button>
                </div>
                <div className="flex flex-col gap-6 text-xl font-bold">

                   <a href="#services" onClick={() => setIsMenuOpen(false)}>Услуги</a>
                   <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Галерея</a>
                   <a href="#about" onClick={() => setIsMenuOpen(false)}>О нас</a>
                   <div className="h-px bg-slate-100" />
                   <a href="tel:87476708025" className="text-[#7FB069]">8 747 670 80 25 </a>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}