import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:['vue',{
        'naive-ui':['useDialog','useMessage','useNotification','useLoadingBar']
      },'vue-router'],
      include:[
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      eslintrc:{
        enabled:true,
        filepath:'./.eslintrc-auto-import.json',
        globalsPropValue:true
      }
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    
  ],
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  }
})
