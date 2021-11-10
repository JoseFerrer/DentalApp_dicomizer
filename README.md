# Deploying DentalApp Dicomizer

### Construir la imagen docker

`docker build --no-cache -t emetac-frontend .`

### Iniciar el contenedor

`docker run -d --rm --name emetac-front -p 3000:3000 emetac-frontend`

