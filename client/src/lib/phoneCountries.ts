export type PhoneCountry = {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  dial: string;
  flag: string;
};

/** Curated list — Suisse en premier (défaut Summit One). */
export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: "CH", name: "Suisse", dial: "+41", flag: "🇨🇭" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Allemagne", dial: "+49", flag: "🇩🇪" },
  { code: "IT", name: "Italie", dial: "+39", flag: "🇮🇹" },
  { code: "BE", name: "Belgique", dial: "+32", flag: "🇧🇪" },
  { code: "LU", name: "Luxembourg", dial: "+352", flag: "🇱🇺" },
  { code: "AT", name: "Autriche", dial: "+43", flag: "🇦🇹" },
  { code: "LI", name: "Liechtenstein", dial: "+423", flag: "🇱🇮" },
  { code: "ES", name: "Espagne", dial: "+34", flag: "🇪🇸" },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "NL", name: "Pays-Bas", dial: "+31", flag: "🇳🇱" },
  { code: "GB", name: "Royaume-Uni", dial: "+44", flag: "🇬🇧" },
  { code: "IE", name: "Irlande", dial: "+353", flag: "🇮🇪" },
  { code: "US", name: "États-Unis", dial: "+1", flag: "🇺🇸" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "MC", name: "Monaco", dial: "+377", flag: "🇲🇨" },
  { code: "AD", name: "Andorre", dial: "+376", flag: "🇦🇩" },
  { code: "SE", name: "Suède", dial: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norvège", dial: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Danemark", dial: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finlande", dial: "+358", flag: "🇫🇮" },
  { code: "PL", name: "Pologne", dial: "+48", flag: "🇵🇱" },
  { code: "CZ", name: "Tchéquie", dial: "+420", flag: "🇨🇿" },
  { code: "AE", name: "Émirats arabes unis", dial: "+971", flag: "🇦🇪" },
  { code: "SG", name: "Singapour", dial: "+65", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", dial: "+852", flag: "🇭🇰" },
  { code: "JP", name: "Japon", dial: "+81", flag: "🇯🇵" },
  { code: "AU", name: "Australie", dial: "+61", flag: "🇦🇺" },
  { code: "BR", name: "Brésil", dial: "+55", flag: "🇧🇷" },
  { code: "MA", name: "Maroc", dial: "+212", flag: "🇲🇦" },
  { code: "TN", name: "Tunisie", dial: "+216", flag: "🇹🇳" },
  { code: "DZ", name: "Algérie", dial: "+213", flag: "🇩🇿" },
];

export const DEFAULT_PHONE_COUNTRY = PHONE_COUNTRIES[0];
