/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APP_POSITION_STACK_URL?: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}