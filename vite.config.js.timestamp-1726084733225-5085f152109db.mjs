// vite.config.js
import { defineConfig } from "file:///C:/Users/AL/Documents/GitHub/js13k2024/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///C:/Users/AL/Documents/GitHub/js13k2024/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import mkcert from "file:///C:/Users/AL/Documents/GitHub/js13k2024/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import gltf from "file:///C:/Users/AL/Documents/GitHub/js13k2024/node_modules/vite-plugin-gltf/dist/vite.js";
import { dedup, draco, prune, textureCompress } from "file:///C:/Users/AL/Documents/GitHub/js13k2024/node_modules/@gltf-transform/functions/dist/functions.modern.js";
var vite_config_default = defineConfig({
  plugins: [
    svelte(),
    mkcert(),
    gltf({
      transforms: [
        // remove unused resources
        prune(),
        // combine duplicated resources
        dedup(),
        draco()
      ]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBTFxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXGpzMTNrMjAyNFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQUxcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxqczEzazIwMjRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0FML0RvY3VtZW50cy9HaXRIdWIvanMxM2syMDI0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSAnQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZSdcclxuaW1wb3J0IG1rY2VydCBmcm9tICd2aXRlLXBsdWdpbi1ta2NlcnQnXHJcbmltcG9ydCBnbHRmIGZyb20gXCJ2aXRlLXBsdWdpbi1nbHRmXCI7IC8vIChiKSBWaXRlXHJcbmltcG9ydCB7IGRlZHVwLCBkcmFjbywgcHJ1bmUsIHRleHR1cmVDb21wcmVzcyB9IGZyb20gXCJAZ2x0Zi10cmFuc2Zvcm0vZnVuY3Rpb25zXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHN2ZWx0ZSgpLFxyXG4gICAgbWtjZXJ0KCksXHJcbiAgICBnbHRmKHtcclxuICAgICAgdHJhbnNmb3JtczogW1xyXG4gICAgICAgIC8vIHJlbW92ZSB1bnVzZWQgcmVzb3VyY2VzXHJcbiAgICAgICAgcHJ1bmUoKSxcclxuICAgICAgICAvLyBjb21iaW5lIGR1cGxpY2F0ZWQgcmVzb3VyY2VzXHJcbiAgICAgICAgZGVkdXAoKSxcclxuICAgICAgICBkcmFjbygpXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1QsU0FBUyxvQkFBb0I7QUFDN1UsU0FBUyxjQUFjO0FBQ3ZCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFDakIsU0FBUyxPQUFPLE9BQU8sT0FBTyx1QkFBdUI7QUFHckQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsS0FBSztBQUFBLE1BQ0gsWUFBWTtBQUFBO0FBQUEsUUFFVixNQUFNO0FBQUE7QUFBQSxRQUVOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUFDO0FBQUEsSUFDWCxDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
