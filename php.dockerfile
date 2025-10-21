# Empezamos desde la imagen de PHP que ya usas
FROM php:8.3-fpm

# Instalamos dependencias y extensiones de PHP (¡incluyendo bcmath y pdo_mysql!)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
	libzip-dev\
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# Instalamos Composer globalmente
RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
RUN php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN rm /tmp/composer-setup.php

# Establecemos el directorio de trabajo
WORKDIR /var/www/html