# Используем официальный образ Node в качестве базового образа
FROM node:latest

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json файлы и устанавливаем зависимости
COPY ./package*.json ./
RUN npm install

# Копируем все файлы из текущей директории в контейнер
COPY . /app

# Собираем приложение
RUN npm run build

# Определяем, что приложение будет слушать порт 80. (Примечание: Podman не требует явного указания портов при запуске контейнера)
# EXPOSE 80

# Команда для запуска сервера
CMD ["npm", "run", "serve"]
