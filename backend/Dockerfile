# Usar una imagen base con JDK 21
FROM amazoncorretto:21


# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el JAR construido (asumiendo que el JAR se llama app.jar)
COPY target/Adapptado-1.jar app.jar

# Exponer el puerto de la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
