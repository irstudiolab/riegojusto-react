# 🌱 RiegoJusto - Interfaz en React

**Proyecto Integrador INF-516 — Grupo #08 — UASD 2026**
**Hito: Migración del Frontend a React**

Esta es la interfaz web desarrollada en React para el proyecto **RiegoJusto** (Caso AguaFrontera). La aplicación consume los datos de nuestra API RESTful (Node.js/Express) para gestionar el registro y la visualización de parcelas agrícolas.

## 🛠️ Tecnologías Utilizadas
*   **React.js** (Componentes funcionales, `useState`, `useEffect`)
*   **Vite** (Entorno de desarrollo y empaquetado)
*   **JavaScript (ES6+)**
*   **CSS3 / Estilos en línea**
*   **Fetch API** para el consumo de datos del backend.

## ⚙️ Características Implementadas
*   Arquitectura basada en 4 componentes reutilizables (`App`, `Mensaje`, `TablaParcelas`, `FormularioParcela`).
*   Manejo de estados de carga y error en la interfaz.
*   Formulario funcional para registrar nuevas parcelas.
*   Renderizado dinámico de listas de datos sin recargar la página.
*   Conexión con la API local a través de `fetch()`.

## 🚀 Cómo ejecutar en local

1. Asegúrate de tener la **API de Node.js** corriendo en el puerto 3000.
2. Instala las dependencias de este frontend:
   ```bash
   npm install
   
3. Inicia el servidor de desarrollo:
 ```bash
   npm run dev

4. Abre el enlace http://localhost:5173 en tu navegador.

## 🔗 Repositorio de la API
El backend de este proyecto está disponible en:
https://github.com/anyicalcano23-tech/-api-proyecto-final-uasd

Desarrollado por el Grupo #08 para la asignatura Lenguaje de Programación III (INF5160-05).
