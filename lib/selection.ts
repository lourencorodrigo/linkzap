/** Lê o texto selecionado na aba ativa. Precisa da permissão `activeTab`. */
export async function readActiveTabSelection(): Promise<string> {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id) return '';

  // MV2 (Firefox) não tem `browser.scripting`.
  if (import.meta.env.MANIFEST_VERSION === 2) {
    const results = await browser.tabs.executeScript(tab.id, {
      code: 'window.getSelection()?.toString() ?? ""',
    });
    return typeof results?.[0] === 'string' ? results[0] : '';
  }

  // A seleção pode estar num iframe, então varremos todos os frames e
  // usamos o primeiro que devolveu texto.
  const injections = await browser.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: () => window.getSelection()?.toString() ?? '',
  });

  return injections.find(({ result }) => result?.trim())?.result ?? '';
}
