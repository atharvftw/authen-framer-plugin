import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import mkcert from "vite-plugin-mkcert"
import framer from "vite-plugin-framer"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), mkcert(), framer()],
    build: {
        target: "ES2022",
        outDir: 'dist',
        lib: {
            entry: 'src/plugin.tsx',
            formats: ['es'],
            fileName: 'plugin',
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
})
