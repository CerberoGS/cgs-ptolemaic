# --- ELIGE TU IMAGEN BASE ---
# 1. Para PC con CPU-solamente (o AMD/Apple Silicon GPU - ¡usa esta!)
# FROM pytorch/pytorch:latest

# 2. Para PC con GPU NVIDIA 
# FROM pytorch/pytorch:latest-cuda11.8

# 3. Para PC con GPU AMD (ROCm) <-- ¡USA ESTA LÍNEA!
FROM rocm/pytorch:latest
# -----------------------------

WORKDIR /app

# Establece el directorio de caché que usará la librería 'transformers'
ENV CACHE_DIR=/models
ENV HF_HOME=/models
ENV PYTHONUNBUFFERED=1

# Copiar e instalar dependencias
COPY requirements.txt .

# Actualiza apt e instala git Y LAS DEPENDENCIAS DE COMPILACIÓN <--- CAMBIO AQUÍ
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    cmake \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
	
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY app.py .

# Exponer el puerto
EXPOSE 8000

# Comando para iniciar el servidor
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]