# **TaskAppFrontend - Додаток для управління задачами**

## **Огляд проекту** 🎯

TaskAppFrontend — це клієнтська частина настільного додатку для управління задачами, створеного за допомогою **React.js** та **Electron.js**. Додаток дозволяє користувачам взаємодіяти з API TaskAppBackend для управління задачами, включаючи створення, редагування, видалення, фільтрацію та пошук задач. Додаток повністю адаптивний і працює на всіх платформах (Windows та macOS).

---

## **Основні функції** 📝

### **Інтерфейс управління задачами** 🖥️

- **Відображення списку задач**: Отримання та відображення задач, що надходять із бекенду.
- **Деталі задачі**: Показ задач з заголовком, описом та статусом.
- **Створення нової задачі**: Форма для створення нової задачі з заголовком, описом та статусом.
- **Редагування задачі**: Редагування існуючих задач (заголовок, опис, статус).
- **Видалення задачі**: Видалення задач з переліку.

### **Фільтрація та пошук** 🔍

- **Фільтрація задач**: Користувачі можуть фільтрувати задачі за статусом виконання (виконано/не виконано).
- **Пошук задач**: Користувачі можуть шукати задачі за заголовком або описом.

### **Адаптивний дизайн** 📱

- Додаток є повністю адаптивним, що дозволяє комфортно користуватися ним на різних пристроях — від мобільних телефонів до десктопів.
- Має простий і зручний інтерфейс для найкращого досвіду користувача.

---

## **Технології та інструменти** ⚙️

- **Фреймворк для фронтенду**: **React.js** (для побудови інтерфейсу користувача).
- **Фреймворк для настільних додатків**: **Electron.js** (для створення кроссплатформених додатків).
- **CSS-фреймворк**: **Ant Design** (для використання готових компонентів інтерфейсу).

---

## **Як запустити фронтенд локально** 🚀

### **1. Клонування репозиторію** 📥

### **2. Встановлення залежностей** 📦

```bash
npm install
```

### **3.  Запуск додатку ** 🔥

```bash
npm run dev
```
Додаток буде доступний за адресою http://localhost:5173.

## **Додаткові примітки** 💡

- Для роботи з бекендом потрібно запустити сервер бекенду (TaskAppBackend) на локальному сервері або у хмарі.
- Всі зміни в інтерфейсі будуть автоматично оновлюватися завдяки Hot Module Replacement.

