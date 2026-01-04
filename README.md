# Crypto Keeper

Crypto Keeper je interaktivna slagalica i avanturistička igra tematska oko Pi Networka, izgrađena u Next.js-u sa Shadcn UI komponentama za sučelje i Tailwind CSS-om za stiliziranje (ljubičaste/narančaste/zlatne boje). Igra simulira Sokoban-stil pomicanja kutija na mreži, sa razinama parsiranim iz stringova i potencijalnom integracijom Pi SDK-a za autentifikaciju korisnika i plaćanja nagrada na završetku razine. Ovo je edukativni projekt za istraživanje kripto ekosustava kroz zabavu.

![Slagalica Screenshot](<img width="933" height="835" alt="Screenshot 2025-12-15 142605" src="https://github.com/user-attachments/assets/7999392a-e7a1-48d7-9a9e-2fa6c6d7fa25" />).

## Značajke
- **Slagalica Logika**: Pomicanje igrača i kutija sa strelicama, provjera pobjede (sve kutije na ciljevima), reset razine.
- **Responzivnost**: Prilagodba za mobilne uređaje preko use-mobile.tsx.
- **Pi Integracija**: Autentifikacija i mikropayments preko Pi SDK-a (sandbox/live mod).
- **UI Komponente**: Shadcn sa Radix UI (Button, Card, Drawer) za moderne interakcije.
- **Stiliziranje**: Tailwind sa Pi-tematskim bojama iz globals.css.

## Instalacija
1. Klonirajte repo: `git clone https://github.com/Muradif/crypto-keeper.git`
2. Idi u folder: `cd crypto-keeper`
3. Instalirajte ovisnosti: `pnpm install` (ili `npm install` ako nemate PNPM)
4. Pokrenite lokalni server: `pnpm dev`
5. Otvorite browser na http://localhost:3000

Ako dobijete PNPM greške (npr. ERESOLVE), pokušajte `pnpm install --force` ili ažurirajte PNPM na najnoviju verziju.

## Upotreba
- **Igranje**: Koristite strelice za pomicanje igrača/kutija; resetirajte sa RotateCcw ikonom.
- **Pi Integracija** (opcionalno):
  - Dodajte Pi SDK u `layout.tsx`: `<script src="https://sdk.minepi.com/pi-sdk.js" async />`
  - Inicijalizirajte u `page.tsx`: 
    ```tsx
    useEffect(() => {
      window.Pi.init({ version: '2.0', sandbox: true });
    }, []);
