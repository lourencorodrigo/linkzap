import { useEffect, useState } from 'react';
import { Check, Clipboard, ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Phone, parsePhone, whatsappUrl } from '@/lib/phone';
import { readActiveTabSelection } from '@/lib/selection';

type Status = 'loading' | 'found' | 'not-found' | 'error';

interface Selection {
  status: Status;
  phone: Phone | null;
}

function useSelectedPhone(): Selection {
  const [selection, setSelection] = useState<Selection>({
    status: 'loading',
    phone: null,
  });

  useEffect(() => {
    let active = true;

    readActiveTabSelection()
      .then((text) => {
        if (!active) return;
        const phone = parsePhone(text);
        setSelection({ status: phone ? 'found' : 'not-found', phone });
      })
      .catch((error) => {
        if (!active) return;
        console.error('Não foi possível ler a seleção da aba', error);
        setSelection({ status: 'error', phone: null });
      });

    return () => {
      active = false;
    };
  }, []);

  return selection;
}

const DESCRIPTIONS: Record<Status, string> = {
  loading: 'Lendo a seleção…',
  found: 'Número selecionado',
  'not-found': 'Nenhum telefone selecionado',
  error: 'Não foi possível ler esta página',
};

const HINTS: Record<Status, string> = {
  loading: '',
  found: 'O WhatsApp será aberto em uma nova aba',
  'not-found': 'Selecione um telefone na página e clique aqui de novo',
  error: 'Abra a extensão em uma aba comum (http ou https)',
};

function App() {
  const { status, phone } = useSelectedPhone();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function handleCopy() {
    if (!phone) return;
    try {
      await navigator.clipboard.writeText(phone.display);
      setCopied(true);
    } catch (error) {
      console.error('Não foi possível copiar o número', error);
    }
  }

  async function handleOpen() {
    if (!phone) return;
    await browser.tabs.create({ url: whatsappUrl(phone.e164) });
    window.close();
  }

  return (
    <Card className="w-87.5 gap-4 border-0 py-4 shadow-none">
      <CardHeader className="grid-cols-[auto_1fr] items-center gap-x-3 px-4">
        <span className="flex size-9 items-center justify-center rounded-full bg-green-50">
          <MessageCircle className="size-4.5 text-green-700" />
        </span>
        <div className="grid gap-0.5">
          <CardTitle className="text-base">Abrir no WhatsApp</CardTitle>
          <CardDescription className="text-xs">
            {DESCRIPTIONS[status]}
          </CardDescription>
        </div>
      </CardHeader>

      {phone && (
        <CardContent className="px-4">
          <div className="relative">
            <Input
              readOnly
              value={phone.display}
              className="h-12 bg-muted/40 pr-11 text-sm"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
              aria-label={copied ? 'Número copiado' : 'Copiar número'}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
            >
              {copied ? <Check className="text-green-700" /> : <Clipboard />}
            </Button>
          </div>
        </CardContent>
      )}

      <CardFooter className="flex-col gap-2 px-4">
        <Button
          onClick={handleOpen}
          disabled={!phone}
          className="h-11 w-full bg-green-700 text-white hover:bg-green-700/90"
        >
          Abrir conversa
          <ExternalLink />
        </Button>
        {HINTS[status] && (
          <p className="text-center text-xs text-muted-foreground">
            {HINTS[status]}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

export default App;
