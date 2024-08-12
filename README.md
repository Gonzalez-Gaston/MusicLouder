# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Claro, aquí tienes una versión más informal del README para tu aplicación MusicLouder:

---

# MusicLouder 🎶

¡Bienvenido a MusicLouder! 🎉 Esta es nuestra app de música para explorar y disfrutar de tus artistas y canciones favoritas. Aquí te contamos cómo instalarla, qué hace y cómo empezar a usarla.

## 🚀 Instalación

1. **Clona el repositorio**: Primero, necesitas clonar el repositorio en tu máquina. Usa este comando en tu terminal:
   ```bash
   git clone https://github.com/Gonzalez-Gaston/MusicLouder.git
   ```

2. **Navega a la carpeta del proyecto**:
   ```bash
   cd musiclouder
   ```

3. **Instala las dependencias**: Asegúrate de tener Node.js y npm instalados. Luego, instala las dependencias del proyecto con:
   ```bash
   npm install
   ```

4. **Inicia el servidor**: Una vez que las dependencias están instaladas, ejecuta el servidor con:
   ```bash
   npm run dev
   ```

   Esto lanzará la aplicación en `http://localhost:5173`. ¡Abre tu navegador y empieza a explorar!

## 📜 Funcionalidades

Aquí están las cosas que puedes hacer con MusicLouder:

- **Ver Canciones y Artistas**: ¡Explora y encuentra tu música favorita!

- **Menú de Opciones**: Cada tarjeta de canción y álbum tiene un menú con opciones para:
  - **Editar**: Cambia la información de la canción o álbum.
  - **Eliminar**: Elimina la canción o álbum (con confirmación para evitar eliminaciones accidentales).
  - **Agregar a la Playlist**: Añade canciones a tu playlist personal.

- **Paginación**: La sección de artistas tiene paginación para navegar fácilmente entre diferentes páginas de artistas.

## 🛠️ ¿Cómo funciona?

1. **Tarjetas de Canciones y Álbumes**:El menú de opciones se muestra en la esquina inferior derecha de cada tarjeta.

2. **Confirmaciones**: Para evitar eliminar algo por accidente, necesitarás confirmar la acción de eliminar. Las opciones de editar y agregar a la playlist no requieren confirmación.

## 🧩 Cosas que puedes mejorar

Si tienes ideas para mejorar la app o encuentras algún bug, Puedes abrir un issue o enviar un pull request en el repositorio.