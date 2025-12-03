# ===== 1. Сборка (builder) =====
FROM node:24.7-alpine3.21 AS builder

WORKDIR /app

# Копирование package.json и lockfile — для кэширования
COPY package*.json ./

# Отключаем husky в Docker
ENV HUSKY=0

# Устанавливаем ВСЁ (включая devDependencies — они нужны для сборки)
RUN npm ci

# Копируем исходники
COPY . .

# Сборка
RUN npm run build

CMD ["npm", "run", "preview"]