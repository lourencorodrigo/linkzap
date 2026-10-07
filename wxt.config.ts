import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'LinkZap',
    description:
      'Selecione um telefone em qualquer página, clique com o botão direito e abra a conversa no WhatsApp na hora.',
    permissions: ['activeTab', 'scripting', 'contextMenus'],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
