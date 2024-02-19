/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_API: string;
  readonly VITE_CLOUD_NAME;
  readonly VITE_UPLOAD_PRESET;
  readonly VITE_ML_TOKEN
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
