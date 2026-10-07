const DEFAULT_COUNTRY_CODE = '55';

/** Sequências que podem ser um telefone dentro de um texto qualquer. */
const CANDIDATE_RE = /\+?\d[\d\s().\-–—]{6,}\d/g;

export interface Phone {
  /** Apenas dígitos, com código do país — formato aceito pelo wa.me. */
  e164: string;
  /** Versão legível, para exibir no popup. */
  display: string;
}

/**
 * DDD + assinante: celular tem 9 dígitos e começa com 9, fixo tem 8 e começa
 * entre 2 e 5. A checagem evita confundir CPF/CNPJ e afins com telefone.
 */
function isBrazilianNumber(digits: string): boolean {
  const area = Number(digits.slice(0, 2));
  const subscriber = digits.slice(2);

  if (area < 11 || area > 99) return false;
  if (subscriber.length === 9) return subscriber.startsWith('9');
  if (subscriber.length === 8) return /^[2-5]/.test(subscriber);

  return false;
}

/**
 * Converte um trecho de texto em dígitos E.164, assumindo Brasil quando o
 * número vem sem código de país. Retorna `null` quando não dá pra confiar.
 */
function toE164(raw: string): string | null {
  const isInternational = raw.trimStart().startsWith('+');
  const digits = raw.replace(/\D/g, '');

  if (isInternational) {
    return digits.length >= 10 && digits.length <= 15 ? digits : null;
  }

  if (isBrazilianNumber(digits)) {
    return `${DEFAULT_COUNTRY_CODE}${digits}`;
  }

  // Já veio com o 55 na frente, só sem o "+".
  if (
    digits.startsWith(DEFAULT_COUNTRY_CODE) &&
    isBrazilianNumber(digits.slice(2))
  ) {
    return digits;
  }

  return null;
}

/** `5511998765432` -> `+55 11 99876-5432`. */
export function formatPhone(e164: string): string {
  if (
    e164.startsWith(DEFAULT_COUNTRY_CODE) &&
    (e164.length === 12 || e164.length === 13)
  ) {
    const area = e164.slice(2, 4);
    const subscriber = e164.slice(4);
    const prefixLength = subscriber.length === 9 ? 5 : 4;
    return `+${DEFAULT_COUNTRY_CODE} ${area} ${subscriber.slice(0, prefixLength)}-${subscriber.slice(prefixLength)}`;
  }

  return `+${e164}`;
}

/** Primeiro telefone plausível encontrado no texto selecionado. */
export function parsePhone(text: string): Phone | null {
  for (const match of text.matchAll(CANDIDATE_RE)) {
    const e164 = toE164(match[0]);
    if (e164) {
      return { e164, display: formatPhone(e164) };
    }
  }

  return null;
}

export function whatsappUrl(e164: string): string {
  return `https://wa.me/${e164}`;
}
