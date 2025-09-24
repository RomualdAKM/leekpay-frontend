export interface Country {
  code: string
  name: string
  flag: string
  dialCode: string
}

export const useCountries = () => {
  const countries: Country[] = [
    // Afrique
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', dialCode: '+225' },
    { code: 'SN', name: 'Sénégal', flag: '🇸🇳', dialCode: '+221' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱', dialCode: '+223' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', dialCode: '+226' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪', dialCode: '+227' },
    { code: 'TG', name: 'Togo', flag: '🇹🇬', dialCode: '+228' },
    { code: 'BJ', name: 'Bénin', flag: '🇧🇯', dialCode: '+229' },
    { code: 'MU', name: 'Maurice', flag: '🇲🇺', dialCode: '+230' },
    { code: 'LR', name: 'Libéria', flag: '🇱🇷', dialCode: '+231' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', dialCode: '+232' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', dialCode: '+233' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234' },
    { code: 'TD', name: 'Tchad', flag: '🇹🇩', dialCode: '+235' },
    { code: 'CF', name: 'République centrafricaine', flag: '🇨🇫', dialCode: '+236' },
    { code: 'CM', name: 'Cameroun', flag: '🇨🇲', dialCode: '+237' },
    { code: 'CV', name: 'Cap-Vert', flag: '🇨🇻', dialCode: '+238' },
    { code: 'ST', name: 'São Tomé-et-Príncipe', flag: '🇸🇹', dialCode: '+239' },
    { code: 'GQ', name: 'Guinée équatoriale', flag: '🇬🇶', dialCode: '+240' },
    { code: 'GA', name: 'Gabon', flag: '🇬🇦', dialCode: '+241' },
    { code: 'CG', name: 'République du Congo', flag: '🇨🇬', dialCode: '+242' },
    { code: 'CD', name: 'République démocratique du Congo', flag: '🇨🇩', dialCode: '+243' },
    { code: 'AO', name: 'Angola', flag: '🇦🇴', dialCode: '+244' },
    { code: 'GW', name: 'Guinée-Bissau', flag: '🇬🇼', dialCode: '+245' },
    { code: 'SC', name: 'Seychelles', flag: '🇸🇨', dialCode: '+248' },
    { code: 'SD', name: 'Soudan', flag: '🇸🇩', dialCode: '+249' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼', dialCode: '+250' },
    { code: 'ET', name: 'Éthiopie', flag: '🇪🇹', dialCode: '+251' },
    { code: 'SO', name: 'Somalie', flag: '🇸🇴', dialCode: '+252' },
    { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', dialCode: '+253' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '+254' },
    { code: 'TZ', name: 'Tanzanie', flag: '🇹🇿', dialCode: '+255' },
    { code: 'UG', name: 'Ouganda', flag: '🇺🇬', dialCode: '+256' },
    { code: 'BI', name: 'Burundi', flag: '🇧🇮', dialCode: '+257' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', dialCode: '+258' },
    { code: 'ZM', name: 'Zambie', flag: '🇿🇲', dialCode: '+260' },
    { code: 'MG', name: 'Madagascar', flag: '🇲🇬', dialCode: '+261' },
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', dialCode: '+263' },
    { code: 'NA', name: 'Namibie', flag: '🇳🇦', dialCode: '+264' },
    { code: 'MW', name: 'Malawi', flag: '🇲🇼', dialCode: '+265' },
    { code: 'LS', name: 'Lesotho', flag: '🇱🇸', dialCode: '+266' },
    { code: 'BW', name: 'Botswana', flag: '🇧🇼', dialCode: '+267' },
    { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', dialCode: '+268' },
    { code: 'KM', name: 'Comores', flag: '🇰🇲', dialCode: '+269' },
    { code: 'ZA', name: 'Afrique du Sud', flag: '🇿🇦', dialCode: '+27' },
    { code: 'ER', name: 'Érythrée', flag: '🇪🇷', dialCode: '+291' },
    { code: 'DZ', name: 'Algérie', flag: '🇩🇿', dialCode: '+213' },
    { code: 'TN', name: 'Tunisie', flag: '🇹🇳', dialCode: '+216' },
    { code: 'LY', name: 'Libye', flag: '🇱🇾', dialCode: '+218' },
    { code: 'GM', name: 'Gambie', flag: '🇬🇲', dialCode: '+220' },
    { code: 'GN', name: 'Guinée', flag: '🇬🇳', dialCode: '+224' },
    { code: 'MR', name: 'Mauritanie', flag: '🇲🇷', dialCode: '+222' },
    { code: 'EG', name: 'Égypte', flag: '🇪🇬', dialCode: '+20' },
    { code: 'MA', name: 'Maroc', flag: '🇲🇦', dialCode: '+212' },
    
    // Europe
    { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
    { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', dialCode: '+44' },
    { code: 'DE', name: 'Allemagne', flag: '🇩🇪', dialCode: '+49' },
    { code: 'IT', name: 'Italie', flag: '🇮🇹', dialCode: '+39' },
    { code: 'ES', name: 'Espagne', flag: '🇪🇸', dialCode: '+34' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351' },
    { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱', dialCode: '+31' },
    { code: 'BE', name: 'Belgique', flag: '🇧🇪', dialCode: '+32' },
    { code: 'CH', name: 'Suisse', flag: '🇨🇭', dialCode: '+41' },
    { code: 'AT', name: 'Autriche', flag: '🇦🇹', dialCode: '+43' },
    { code: 'SE', name: 'Suède', flag: '🇸🇪', dialCode: '+46' },
    { code: 'NO', name: 'Norvège', flag: '🇳🇴', dialCode: '+47' },
    { code: 'DK', name: 'Danemark', flag: '🇩🇰', dialCode: '+45' },
    { code: 'FI', name: 'Finlande', flag: '🇫🇮', dialCode: '+358' },
    { code: 'PL', name: 'Pologne', flag: '🇵🇱', dialCode: '+48' },
    { code: 'CZ', name: 'République tchèque', flag: '🇨🇿', dialCode: '+420' },
    { code: 'HU', name: 'Hongrie', flag: '🇭🇺', dialCode: '+36' },
    { code: 'RO', name: 'Roumanie', flag: '🇷🇴', dialCode: '+40' },
    { code: 'BG', name: 'Bulgarie', flag: '🇧🇬', dialCode: '+359' },
    { code: 'GR', name: 'Grèce', flag: '🇬🇷', dialCode: '+30' },
    { code: 'HR', name: 'Croatie', flag: '🇭🇷', dialCode: '+385' },
    { code: 'SI', name: 'Slovénie', flag: '🇸🇮', dialCode: '+386' },
    { code: 'SK', name: 'Slovaquie', flag: '🇸🇰', dialCode: '+421' },
    { code: 'EE', name: 'Estonie', flag: '🇪🇪', dialCode: '+372' },
    { code: 'LV', name: 'Lettonie', flag: '🇱🇻', dialCode: '+371' },
    { code: 'LT', name: 'Lituanie', flag: '🇱🇹', dialCode: '+370' },
    { code: 'IE', name: 'Irlande', flag: '🇮🇪', dialCode: '+353' },
    { code: 'IS', name: 'Islande', flag: '🇮🇸', dialCode: '+354' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', dialCode: '+352' },
    { code: 'MT', name: 'Malte', flag: '🇲🇹', dialCode: '+356' },
    { code: 'CY', name: 'Chypre', flag: '🇨🇾', dialCode: '+357' },
    { code: 'RU', name: 'Russie', flag: '🇷🇺', dialCode: '+7' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380' },
    { code: 'BY', name: 'Biélorussie', flag: '🇧🇾', dialCode: '+375' },
    { code: 'MD', name: 'Moldavie', flag: '🇲🇩', dialCode: '+373' },
    
    // Amérique du Nord
    { code: 'US', name: 'États-Unis', flag: '🇺🇸', dialCode: '+1' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
    { code: 'MX', name: 'Mexique', flag: '🇲🇽', dialCode: '+52' },
    
    // Amérique du Sud
    { code: 'BR', name: 'Brésil', flag: '🇧🇷', dialCode: '+55' },
    { code: 'AR', name: 'Argentine', flag: '🇦🇷', dialCode: '+54' },
    { code: 'CL', name: 'Chili', flag: '🇨🇱', dialCode: '+56' },
    { code: 'CO', name: 'Colombie', flag: '🇨🇴', dialCode: '+57' },
    { code: 'PE', name: 'Pérou', flag: '🇵🇪', dialCode: '+51' },
    { code: 'VE', name: 'Venezuela', flag: '🇻🇪', dialCode: '+58' },
    { code: 'EC', name: 'Équateur', flag: '🇪🇨', dialCode: '+593' },
    { code: 'BO', name: 'Bolivie', flag: '🇧🇴', dialCode: '+591' },
    { code: 'PY', name: 'Paraguay', flag: '🇵🇾', dialCode: '+595' },
    { code: 'UY', name: 'Uruguay', flag: '🇺🇾', dialCode: '+598' },
    { code: 'GY', name: 'Guyana', flag: '🇬🇾', dialCode: '+592' },
    { code: 'SR', name: 'Suriname', flag: '🇸🇷', dialCode: '+597' },
    
    // Asie
    { code: 'CN', name: 'Chine', flag: '🇨🇳', dialCode: '+86' },
    { code: 'IN', name: 'Inde', flag: '🇮🇳', dialCode: '+91' },
    { code: 'JP', name: 'Japon', flag: '🇯🇵', dialCode: '+81' },
    { code: 'KR', name: 'Corée du Sud', flag: '🇰🇷', dialCode: '+82' },
    { code: 'TH', name: 'Thaïlande', flag: '🇹🇭', dialCode: '+66' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63' },
    { code: 'ID', name: 'Indonésie', flag: '🇮🇩', dialCode: '+62' },
    { code: 'MY', name: 'Malaisie', flag: '🇲🇾', dialCode: '+60' },
    { code: 'SG', name: 'Singapour', flag: '🇸🇬', dialCode: '+65' },
    { code: 'AE', name: 'Émirats arabes unis', flag: '🇦🇪', dialCode: '+971' },
    { code: 'SA', name: 'Arabie saoudite', flag: '🇸🇦', dialCode: '+966' },
    { code: 'TR', name: 'Turquie', flag: '🇹🇷', dialCode: '+90' },
    { code: 'IL', name: 'Israël', flag: '🇮🇱', dialCode: '+972' },
    { code: 'LB', name: 'Liban', flag: '🇱🇧', dialCode: '+961' },
    { code: 'JO', name: 'Jordanie', flag: '🇯🇴', dialCode: '+962' },
    { code: 'SY', name: 'Syrie', flag: '🇸🇾', dialCode: '+963' },
    { code: 'IQ', name: 'Irak', flag: '🇮🇶', dialCode: '+964' },
    { code: 'IR', name: 'Iran', flag: '🇮🇷', dialCode: '+98' },
    { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', dialCode: '+93' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰', dialCode: '+92' },
    { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', dialCode: '+880' },
    { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', dialCode: '+94' },
    { code: 'NP', name: 'Népal', flag: '🇳🇵', dialCode: '+977' },
    { code: 'BT', name: 'Bhoutan', flag: '🇧🇹', dialCode: '+975' },
    { code: 'MV', name: 'Maldives', flag: '🇲🇻', dialCode: '+960' },
    
    // Océanie
    { code: 'AU', name: 'Australie', flag: '🇦🇺', dialCode: '+61' },
    { code: 'NZ', name: 'Nouvelle-Zélande', flag: '🇳🇿', dialCode: '+64' },
    { code: 'FJ', name: 'Fidji', flag: '🇫🇯', dialCode: '+679' },
    { code: 'PG', name: 'Papouasie-Nouvelle-Guinée', flag: '🇵🇬', dialCode: '+675' },
    { code: 'NC', name: 'Nouvelle-Calédonie', flag: '🇳🇨', dialCode: '+687' },
    { code: 'PF', name: 'Polynésie française', flag: '🇵🇫', dialCode: '+689' }
  ]

  const searchQuery = ref('')
  
  const filteredCountries = computed(() => {
    if (!searchQuery.value) {
      return countries
    }
    
    const query = searchQuery.value.toLowerCase()
    return countries.filter(country => 
      country.name.toLowerCase().includes(query) ||
      country.dialCode.includes(query) ||
      country.code.toLowerCase().includes(query)
    )
  })

  const getCountryByDialCode = (dialCode: string): Country | undefined => {
    return countries.find(country => country.dialCode === dialCode)
  }

  const getCountryByCode = (code: string): Country | undefined => {
    return countries.find(country => country.code === code)
  }

  return {
    countries,
    searchQuery,
    filteredCountries,
    getCountryByDialCode,
    getCountryByCode
  }
}