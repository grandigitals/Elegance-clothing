const translations = {
  en: {
    nav_home: "Home",
    nav_shop: "Shop",
    nav_about: "About",
    nav_contact: "Contact",
    btn_login: "Login",
    btn_cart: "Cart",
    hero_title: "ELEVATE YOUR STYLE",
    hero_subtitle: "Discover the latest trends in men's fashion. Based in Astana, Kazakhstan.",
    hero_cta: "Shop Collection",
    featured_title: "Featured Weekly",
    about_title: "Our Story",
    about_text: "Elegance is more than just a brand; it's a lifestyle. We provide premium quality men's clothing designed to make you stand out.",
    contact_title: "Get in Touch",
    contact_address: "Address",
    contact_phone: "Phone",
    contact_follow: "Follow Us",
    footer_rights: "© 2026 Elegance. All rights reserved."
  },
  ru: {
    nav_home: "Главная",
    nav_shop: "Магазин",
    nav_about: "О нас",
    nav_contact: "Контакты",
    btn_login: "Войти",
    btn_cart: "Корзина",
    hero_title: "ПОДЧЕРКНИТЕ СВОЙ СТИЛЬ",
    hero_subtitle: "Откройте для себя последние тенденции мужской моды. Базируется в Астане, Казахстан.",
    hero_cta: "Смотреть Коллекцию",
    featured_title: "Избранное за неделю",
    about_title: "Наша история",
    about_text: "Elegance - это больше, чем просто бренд; это образ жизни. Мы предлагаем мужскую одежду премиум-качества.",
    contact_title: "Свяжитесь с нами",
    contact_address: "Адрес",
    contact_phone: "Телефон",
    contact_follow: "Подписывайтесь",
    footer_rights: "© 2026 Elegance. Все права защищены."
  },
  kz: {
    nav_home: "Басты бет",
    nav_shop: "Дүкен",
    nav_about: "Біз туралы",
    nav_contact: "Байланыс",
    btn_login: "Кіру",
    btn_cart: "Себет",
    hero_title: "ӨЗ СТИЛІҢІЗДІ КӨТЕРІҢІЗ",
    hero_subtitle: "Ерлер сәніндегі соңғы трендтерді ашыңыз. Астана, Қазақстанда орналасқан.",
    hero_cta: "Топтаманы көру",
    featured_title: "Аптаның таңдаулылары",
    about_title: "Біздің тарихымыз",
    about_text: "Elegance тек бренд қана емес; бұл өмір салты. Біз жоғары сапалы ерлер киімін ұсынамыз.",
    contact_title: "Бізбен байланыс",
    contact_address: "Мекен-жайы",
    contact_phone: "Телефон",
    contact_follow: "Жазылыңыз",
    footer_rights: "© 2026 Elegance. Барлық құқықтар қорғалған."
  }
};

function changeLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  const langSelect = document.getElementById('lang-select');
  if(langSelect) {
      langSelect.value = savedLang;
      langSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
      });
  }
  changeLanguage(savedLang);
});
