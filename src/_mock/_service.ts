// ----------------------------------------------------------------------
// _service.ts
// Mock services data for Internet, SMS/MMS, Conversation, and Hybrid plans
// ----------------------------------------------------------------------

export type ServiceCategory = 'Internet' | 'SMS/MMS' | 'Conversation' | 'Hybrid';

export interface ServicePlan {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number;
  unit: string;
  per: string;
}

// ----------------------------------------------------------------------

export const _services: ServicePlan[] = [
  // 🌐 Internet Plans
  {
    id: 'svc-1',
    category: 'Internet',
    name: 'NetPulse',
    description: 'Get the reliable internet you need for all your online activities.',
    price: 65,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-2',
    category: 'Internet',
    name: 'SpeedWave',
    description: 'All the internet speed you need for streaming and gaming.',
    price: 75,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-3',
    category: 'Internet',
    name: 'StreamLine',
    description: 'Affordable internet with consistent performance.',
    price: 55,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-4',
    category: 'Internet',
    name: 'TurboNet',
    description: 'Blazing-fast speeds for heavy internet users.',
    price: 85,
    unit: 'mo',
    per: 'per line',
  },

  // ✉️ SMS/MMS Plans
  {
    id: 'svc-5',
    category: 'SMS/MMS',
    name: 'TextFlow',
    description: 'Includes 1900 SMS per month.',
    price: 20,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-6',
    category: 'SMS/MMS',
    name: 'ChatBurst',
    description: '2000 SMS per month for frequent texters.',
    price: 25,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-7',
    category: 'SMS/MMS',
    name: 'MessageMax',
    description: 'Unlimited SMS and MMS package.',
    price: 30,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-8',
    category: 'SMS/MMS',
    name: 'PingPack',
    description: 'Budget-friendly pack with 1000 SMS.',
    price: 15,
    unit: 'mo',
    per: 'per line',
  },

  // 🗨️ Conversation Plans
  {
    id: 'svc-9',
    category: 'Conversation',
    name: 'TalkStream',
    description: 'Unlimited domestic calling with HD clarity.',
    price: 30,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-10',
    category: 'Conversation',
    name: 'VoiceLink',
    description: 'Crystal clear HD voice quality calls.',
    price: 35,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-11',
    category: 'Conversation',
    name: 'EchoLine',
    description: 'International calling at discounted rates.',
    price: 40,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-12',
    category: 'Conversation',
    name: 'CallWave',
    description: 'Unlimited national + 500 international minutes.',
    price: 50,
    unit: 'mo',
    per: 'per line',
  },

  // 🔀 Hybrid Plans
  {
    id: 'svc-13',
    category: 'Hybrid',
    name: 'ConnectAll',
    description: 'Combines internet, SMS, and calling in one plan.',
    price: 95,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-14',
    category: 'Hybrid',
    name: 'FusionPack',
    description: 'The ultimate package: data, calls, and messages.',
    price: 120,
    unit: 'mo',
    per: 'per line',
  },
  {
    id: 'svc-15',
    category: 'Hybrid',
    name: 'UnityPlan',
    description: 'Balanced package with moderate data, SMS, and calls.',
    price: 80,
    unit: 'mo',
    per: 'per line',
  },
];
