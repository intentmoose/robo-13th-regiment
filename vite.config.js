import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import mkcert from 'vite-plugin-mkcert'
import gltf from "vite-plugin-gltf"; // (b) Vite
import { dedup, draco, prune, textureCompress } from "@gltf-transform/functions";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    mkcert(),
    gltf({
      transforms: [
        // remove unused resources
        prune(),
        // combine duplicated resources
        dedup(),
        draco()],
    }),
  ],
})
