import { parsePhone, whatsappUrl } from '@/lib/phone';

const MENU_ID = 'linkzap-open-whatsapp';

export default defineBackground(() => {
  // Os itens de menu persistem entre reinícios do service worker, então
  // criá-los só na instalação/atualização evita erro de id duplicado.
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: MENU_ID,
      // O %s é substituído pelo texto selecionado.
      title: 'Abrir "%s" no WhatsApp',
      contexts: ['selection'],
    });
  });

  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId !== MENU_ID) return;

    const phone = parsePhone(info.selectionText ?? '');
    if (!phone) {
      console.warn('Seleção sem telefone válido:', info.selectionText);
      return;
    }

    await browser.tabs.create({
      url: whatsappUrl(phone.e164),
      index: tab ? tab.index + 1 : undefined,
    });
  });
});
