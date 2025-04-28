# RouteWise


### Предварительные требования

- Node.js (рекомендуется версия 18 или новее)
- npm или yarn

### Установка

1.  **Клонируйте репозиторий (если применимо):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Установите зависимости:**
    ```bash
    npm install
    # или
    # yarn install
    ```

### Запуск сервера разработки

Чтобы запустить сервер разработки Next.js:

```bash
npm run dev
# или
# yarn dev
```

Обычно это запускает сервер по адресу `http://localhost:9002`. Откройте этот URL в вашем браузере, чтобы увидеть приложение.

### Запуск сервера разработки Genkit (Опционально)

Если вам нужно напрямую взаимодействовать с потоками Genkit или использовать интерфейс разработчика Genkit:

```bash
npm run genkit:dev
# или для отслеживания изменений
npm run genkit:watch
```

Это запустит сервер разработки Genkit, обычно по адресу `http://localhost:4000`.

### Сборка для продакшена

Чтобы собрать приложение для продакшена:

```bash
npm run build
# или
# yarn build
```

### Запуск продакшен сервера

После сборки вы можете запустить продакшен сервер:

```bash
npm run start
# или
# yarn start
```

## Используемые технологии

- **Фреймворк:** [Next.js](https://nextjs.org/) (App Router)
- **Язык:** [TypeScript](https://www.typescriptlang.org/)
- **UI Библиотека:** [React](https://reactjs.org/)
- **Стилизация:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Компоненты:** [ShadCN UI](https://ui.shadcn.com/)
- **Иконки:** [Lucide React](https://lucide.dev/)
- **AI/Генеративные модели:** [Genkit](https://firebase.google.com/docs/genkit) с [Google AI (Gemini)](https://ai.google.dev/)
- **Управление состоянием:** React Hooks (`useState`, `useEffect`, `useCallback`)
- **Менеджер пакетов:** npm / yarn

## Структура проекта

- `src/app/`: Содержит основные страницы приложения и макет (Next.js App Router).
- `src/components/`: Переиспользуемые React компоненты.
  - `src/components/ui/`: Компоненты из ShadCN UI.
- `src/ai/`: Код, связанный с Genkit.
  - `src/ai/flows/`: Потоки Genkit для взаимодействий с AI.
  - `src/ai/ai-instance.ts`: Конфигурация Genkit.
- `src/services/`: Содержит сервисные функции, такие как получение данных о местах.
- `src/lib/`: Утилитарные функции.
- `src/hooks/`: Пользовательские React хуки.
- `public/`: Статические активы.
- `styles/`: Глобальные CSS стили.
