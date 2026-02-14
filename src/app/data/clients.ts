export interface Client {
  name: string;
  logo?: string;
  category: 'FMCG' | 'Banking' | 'Technology' | 'Telecom' | 'Hospitality' | 'Government' | 'Automotive' | 'Retail' | 'Real Estate' | 'Other';
}

export const clients: Client[] = [
  // FMCG & Beverages
  { name: 'PepsiCo', category: 'FMCG' },
  { name: 'Coca-Cola', category: 'FMCG' },
  { name: 'Mondelez International', category: 'FMCG' },
  { name: 'ITC Limited', category: 'FMCG' },
  { name: 'Parle Products', category: 'FMCG' },
  
  // Banking & Finance
  { name: 'State Bank of India', category: 'Banking' },
  { name: 'HDFC Bank', category: 'Banking' },
  { name: 'ICICI Bank', category: 'Banking' },
  { name: 'Punjab National Bank', category: 'Banking' },
  
  // Technology & Electronics
  { name: 'Samsung', category: 'Technology' },
  { name: 'Philips', category: 'Technology' },
  { name: 'Hitachi', category: 'Technology' },
  { name: 'Micromax', category: 'Technology' },
  { name: 'Intex Technologies', category: 'Technology' },
  
  // Telecom
  { name: 'Bharti Airtel', category: 'Telecom' },
  { name: 'Vodafone', category: 'Telecom' },
  { name: 'Idea Cellular', category: 'Telecom' },
  
  // Government & Public Sector
  { name: 'Madhya Pradesh Tourism', category: 'Government' },
  { name: 'Government of India', category: 'Government' },
  
  // Hospitality & Real Estate
  { name: 'Polywood', category: 'Real Estate' },
  { name: 'Giovanni Village', category: 'Hospitality' },
  { name: 'Desert Springs Resort', category: 'Hospitality' },
  
  // Retail & Fashion
  { name: 'Provogue', category: 'Retail' },
  { name: 'Spykar', category: 'Retail' },
  
  // Automotive
  { name: 'Hero MotoCorp', category: 'Automotive' },
  { name: 'TVS Motor Company', category: 'Automotive' },
  
  // Others
  { name: 'Asian Paints', category: 'Other' },
  { name: 'Bajaj Auto', category: 'Automotive' },
  { name: 'Mahindra & Mahindra', category: 'Automotive' },
];
