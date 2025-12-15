import { Project, Testimonial, HouseType, Partner, Stat, CompletedProject, FAQItem, TeamMember, TimelineEvent, PortfolioItem } from './types';
import { Award, Users, Hammer, Clock } from 'lucide-react';

export const FEATURED_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Destiny Gardens',
    location: 'Joska, Kangundo Road',
    price: 850000,
    priceStr: 'KES 850,000',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1626178793926-22b28d30aa30?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Prime 50x100 plots ready for immediate development. Water and electricity on site.',
    features: ['Ready Title Deeds', 'Water & Electricity', 'Gated Community'],
    type: 'Residential',
    size: '50x100',
    purpose: 'Settlement',
    amenities: ['Borehole', 'Perimeter Fence', 'Graded Roads']
  },
  {
    id: '2',
    title: 'Sunrise Ridge',
    location: 'Juja Farm',
    price: 550000,
    priceStr: 'KES 550,000',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    images: [
        'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Affordable plots in a fast-growing area. Ideal for speculation or future settlement.',
    features: ['Flexible Payment Plan', 'Near Tarmac', 'Schools Nearby'],
    type: 'Residential',
    size: '50x100',
    purpose: 'Investment',
    amenities: ['Electricity Nearby', 'Beaconed']
  },
  {
    id: '3',
    title: 'Haven Heights',
    location: 'Kitengela',
    price: 1200000,
    priceStr: 'KES 1,200,000',
    imageUrl: 'https://images.unsplash.com/photo-1626178793926-22b28d30aa30?auto=format&fit=crop&w=800&q=80',
    images: [
        'https://images.unsplash.com/photo-1626178793926-22b28d30aa30?auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Premium plots in a developed neighborhood. 10 minutes from Kitengela town.',
    features: ['Perimeter Wall', 'Borehole Water', 'Mature Neighborhood'],
    type: 'Residential',
    size: '50x100',
    purpose: 'Settlement',
    amenities: ['Gated Community', '24/7 Security', 'Water on site']
  },
  {
    id: '4',
    title: 'Commercial Hub',
    location: 'Ruai Bypass',
    price: 2500000,
    priceStr: 'KES 2,500,000',
    imageUrl: 'https://images.unsplash.com/photo-1555699875-5775b06460bd?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1555699875-5775b06460bd?auto=format&fit=crop&w=800&q=80'],
    description: 'Strategically located commercial plots touching the tarmac.',
    features: ['Tarmac Frontage', 'High Foot Traffic', 'Ready Titles'],
    type: 'Commercial',
    size: '50x100',
    purpose: 'Commercial',
    amenities: ['3 Phase Power', 'Sewer Line']
  },
  {
    id: '5',
    title: 'Green Valley Homes',
    location: 'Ngong',
    price: 6500000,
    priceStr: 'KES 6.5M',
    imageUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
    images: [
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80'
    ],
    description: '3 Bedroom Bungalows on 50x100 plots. Master ensuite.',
    features: ['Modern Finishes', 'Garden', 'Parking for 2'],
    type: 'House',
    size: '120sqm',
    purpose: 'Settlement',
    amenities: ['Clubhouse', 'Cabro Paved', 'Kids Play Area'],
    bedrooms: 3,
    bathrooms: 2,
    floors: 1,
    status: 'Ready'
  },
  {
    id: '7',
    title: 'Royal Palms Villa',
    location: 'Karen',
    price: 15500000,
    priceStr: 'KES 15.5M',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Luxury 4-bedroom villa with high-end finishes and servant quarters. Located in a serene gated community.',
    features: ['All Ensuite', 'DSQ', 'Smart Home Ready', 'Solar Water Heating'],
    type: 'House',
    size: '250sqm',
    purpose: 'Settlement',
    amenities: ['Swimming Pool', 'Gym', 'Back-up Generator'],
    bedrooms: 4,
    bathrooms: 5,
    floors: 2,
    status: 'Off-plan'
  },
  {
    id: '6',
    title: 'Oasis Gardens',
    location: 'Malindi',
    price: 350000,
    priceStr: 'KES 350,000',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'],
    description: 'Holiday home plots near the ocean. Perfect for AirBnB investment.',
    features: ['Near Ocean', 'Resort Vicinity', 'Title Ready'],
    type: 'Residential',
    size: '50x100',
    purpose: 'Investment',
    amenities: ['Water', 'Electricity']
  }
];

export const HOUSE_TYPES: HouseType[] = [
  {
    id: '1',
    title: 'Modern Maisonette',
    description: 'Spacious double-story designs perfect for families needing extra room and privacy. Includes 4 bedrooms all ensuite.',
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=600&q=80',
    startingPriceStr: 'KES 5.5M',
    features: ['4 Bedrooms', 'DSQ', 'Roof Terrace']
  },
  {
    id: '2',
    title: 'Modern Flat Roof',
    description: 'Contemporary architectural style offering roof utilization for recreation and sleek aesthetics.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-600021529844?auto=format&fit=crop&w=600&q=80',
    startingPriceStr: 'KES 6.2M',
    features: ['Flat Roof', 'Open Plan', 'Glass Facade']
  },
  {
    id: '3',
    title: 'Hidden Roof Bungalow',
    description: 'Cost-effective yet stylish single-level homes with a modern hidden roof design giving a box-style look.',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80',
    startingPriceStr: 'KES 3.8M',
    features: ['3 Bedrooms', 'Hidden Roof', 'Compact Design']
  },
  {
    id: '4',
    title: 'Executive Villa',
    description: 'Luxury redefined. Expansive living areas, high-end finishes, and integrated smart home features.',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
    startingPriceStr: 'KES 12M',
    features: ['5 Bedrooms', 'Swimming Pool', 'Smart Home']
  }
];

export const COMPLETED_PROJECTS: CompletedProject[] = [
    {
        id: '1',
        title: 'Kileleshwa Heights',
        location: 'Nairobi',
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: '2',
        title: 'Mombasa Coastal Villa',
        location: 'Mombasa',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: '3',
        title: 'Karen Family Home',
        location: 'Karen',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80'
    }
];

// --- PORTFOLIO DATA ---

export const CONSTRUCTION_PROJECTS: PortfolioItem[] = [
    {
        id: 'c1',
        category: 'Construction',
        title: 'Kileleshwa Apartments',
        location: 'Kileleshwa, Nairobi',
        description: 'A 12-unit apartment complex featuring modern 3-bedroom apartments with high-end finishes. The project included basement parking, high-speed lifts, and a rooftop terrace.',
        mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Project Type', value: 'Multi-dwelling Residential' },
            { label: 'Duration', value: '14 Months' },
            { label: 'Size', value: '12 Units' },
            { label: 'Status', value: 'Completed 2023' }
        ]
    },
    {
        id: 'c2',
        title: 'Thika Greens Villa',
        category: 'Construction',
        location: 'Thika Greens Golf Estate',
        description: 'A luxurious 4-bedroom country home sitting on a quarter acre. Features include double-volume living area, open plan kitchen, and landscaped gardens.',
        mainImage: 'https://images.unsplash.com/photo-1600596542815-600021529844?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1600596542815-600021529844?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Project Type', value: 'Private Villa' },
            { label: 'Duration', value: '8 Months' },
            { label: 'Finishes', value: 'Premium' },
            { label: 'Architect', value: 'MyPloti Design Team' }
        ]
    },
    {
        id: 'c3',
        title: 'Syokimau Bungalow',
        category: 'Construction',
        location: 'Syokimau, Machakos',
        description: 'A contemporary 3-bedroom master ensuite bungalow with a hidden roof design. Optimized for a 50x100 plot.',
        mainImage: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Project Type', value: 'Residential Bungalow' },
            { label: 'Duration', value: '5 Months' },
            { label: 'Cost Range', value: 'Budget Friendly' }
        ]
    }
];

export const INTERIOR_PROJECTS: PortfolioItem[] = [
    {
        id: 'i1',
        category: 'Interior',
        title: 'Lavington Penthouse',
        location: 'Lavington, Nairobi',
        description: 'Full interior design and fit-out for a duplex penthouse. Included custom gypsum ceilings with ambient lighting, wall paneling, and bespoke furniture selection.',
        mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1616137466218-f487bc2575fc?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Style', value: 'Modern Luxury' },
            { label: 'Scope', value: 'Living, Kitchen, Master Bed' },
            { label: 'Highlights', value: 'Gypsum, Wall Paneling' }
        ]
    },
    {
        id: 'i2',
        category: 'Interior',
        title: 'Modern Kitchen Renovation',
        location: 'Westlands',
        description: 'Transformation of a dated kitchen into a modern culinary space. Features high-gloss acrylic cabinets, quartz countertops, and integrated appliances.',
        mainImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Material', value: 'High Gloss Acrylic' },
            { label: 'Countertop', value: 'White Quartz' },
            { label: 'Duration', value: '3 Weeks' }
        ]
    },
    {
        id: 'i3',
        category: 'Interior',
        title: 'Corporate Office',
        location: 'Upper Hill',
        description: 'Office partition and layout design for a law firm. Focused on privacy, acoustic comfort, and professional aesthetics using glass partitions.',
        mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Area', value: '2500 sqft' },
            { label: 'Partitions', value: 'Aluminum & Glass' },
            { label: 'Flooring', value: 'Carpet Tiles' }
        ]
    }
];

export const LANDSCAPING_PROJECTS: PortfolioItem[] = [
    {
        id: 'l1',
        category: 'Landscaping',
        title: 'Runda Garden Oasis',
        location: 'Runda, Nairobi',
        description: 'Complete landscape design for a half-acre property. Included leveling, Bermuda grass installation, rock gardens, and a water feature.',
        mainImage: 'https://images.unsplash.com/photo-1558905540-2129015929b1?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1558905540-2129015929b1?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Grass Type', value: 'Bermuda' },
            { label: 'Features', value: 'Rock Garden, Fountain' },
            { label: 'Size', value: '0.5 Acres' }
        ]
    },
    {
        id: 'l2',
        category: 'Landscaping',
        title: 'Karen Cabro Driveway',
        location: 'Karen',
        description: 'Heavy-duty cabro paving for a long driveway and parking area. Used high-strength 60mm blocks with kerbs and drainage channels.',
        mainImage: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Material', value: 'Cabro Blocks' },
            { label: 'Pattern', value: 'Herringbone' },
            { label: 'Strength', value: '50 MPa' }
        ]
    },
    {
        id: 'l3',
        category: 'Landscaping',
        title: 'Rooftop Terrace Garden',
        location: 'Kilimani',
        description: 'Conversion of a bare concrete rooftop into a vibrant recreational space with potted plants, artificial turf, and a pergola.',
        mainImage: 'https://images.unsplash.com/photo-1623298317883-6b70254edf31?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1623298317883-6b70254edf31?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Surface', value: 'Artificial Turf' },
            { label: 'Structures', value: 'Timber Pergola' },
            { label: 'Lighting', value: 'Fairy Lights' }
        ]
    }
];

export const WALL_PROJECTS: PortfolioItem[] = [
    {
        id: 'w1',
        category: 'Wall',
        title: 'Gated Community Wall',
        location: 'Ruiru',
        description: 'Perimeter wall construction for a 10-acre gated community. Machine-cut stones with reinforced columns every 3 meters and razor wire installation.',
        mainImage: 'https://images.unsplash.com/photo-1623190695034-75466c429672?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1623190695034-75466c429672?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Length', value: '800 Meters' },
            { label: 'Height', value: '2.4 Meters' },
            { label: 'Security', value: 'Razor Wire' }
        ]
    },
    {
        id: 'w2',
        category: 'Wall',
        title: 'Electric Fence Installation',
        location: 'Langata',
        description: 'Installation of a top-wall electric fence system. 8-strand galvanized wire with a powerful energizer and siren response system.',
        mainImage: 'https://images.unsplash.com/photo-1590248231940-27757962eb04?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1590248231940-27757962eb04?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Type', value: 'Top Wall' },
            { label: 'Strands', value: '8 Lines' },
            { label: 'Voltage', value: '9000V' }
        ]
    },
    {
        id: 'w3',
        category: 'Wall',
        title: 'Decorative Stone Wall',
        location: 'Muthaiga',
        description: 'A premium boundary wall featuring key-finished yellow stone and concrete coping. Designed to match the aesthetic of the main house.',
        mainImage: 'https://images.unsplash.com/photo-1597212720230-67487299b82f?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1597212720230-67487299b82f?auto=format&fit=crop&w=800&q=80'
        ],
        specs: [
            { label: 'Stone', value: 'Yellow Stone' },
            { label: 'Finish', value: 'Keyed Joint' },
            { label: 'Gate', value: 'Automated Steel' }
        ]
    }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Kamau',
    role: 'Homeowner',
    content: 'MyPloti made my dream of owning a home a reality. The process was transparent from buying the land to the final construction handover.',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: '2',
    name: 'David Omondi',
    role: 'Investor',
    content: 'I have bought three plots with them. Their due diligence is top-notch. I received my title deeds within 60 days as promised.',
    imageUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: '3',
    name: 'Grace Wanjiku',
    role: 'Diaspora Client',
    content: 'Building while abroad is hard, but their team gave me weekly updates. The finish quality is excellent.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
  }
];

export const STATS: Stat[] = [
  { id: '1', label: 'Years Experience', value: '21+', icon: Clock },
  { id: '2', label: 'Happy Clients', value: '1000+', icon: Users },
  { id: '3', label: 'Projects Done', value: '45+', icon: Hammer },
  { id: '4', label: 'Awards Won', value: '12', icon: Award },
];

export const PARTNERS: Partner[] = [
    { id: '1', name: 'KCB Bank', logoUrl: 'https://ui-avatars.com/api/?name=KCB+Bank&background=007636&color=fff&size=200&font-size=0.4' },
    { id: '2', name: 'Co-op Bank', logoUrl: 'https://ui-avatars.com/api/?name=Co-op+Bank&background=007636&color=fff&size=200&font-size=0.4' },
    { id: '3', name: 'NCA', logoUrl: 'https://ui-avatars.com/api/?name=NCA&background=007636&color=fff&size=200' },
    { id: '4', name: 'LSK', logoUrl: 'https://ui-avatars.com/api/?name=LSK&background=007636&color=fff&size=200' },
]

export const PROCESS_FAQS: FAQItem[] = [
    {
        question: "Are the title deeds ready?",
        answer: "Yes. All our plots have ready individual title deeds. We conduct thorough due diligence before listing any property to ensure it is free of encumbrances. Once payment is completed, the transfer process begins immediately."
    },
    {
        question: "Do you offer financing or payment plans?",
        answer: "Absolutely. We have flexible payment plans of up to 12 months for land purchases. For construction, we partner with major banks to offer up to 70% financing."
    },
    {
        question: "How do I book a site visit?",
        answer: "We offer free site visits on Wednesdays and Saturdays. You can book by calling us, sending a WhatsApp message, or filling out the booking form on our website. We provide transport from Nairobi CBD."
    },
    {
        question: "Do you handle the actual construction?",
        answer: "Yes, we are a full-service construction company. We have a team of architects, engineers, and skilled contractors to handle your project from design to handover. We are NCA registered."
    },
    {
        question: "Are there any hidden costs?",
        answer: "No. We pride ourselves on transparency. The price you see includes the land, legal fees for the transfer, and stamp duty. For construction, we provide a detailed Bill of Quantities (BQ) so you know exactly what you are paying for."
    }
];

export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: '1',
        name: 'Steve Mbugua',
        role: 'CEO & MD',
        bio: 'Steve Mbugua serves as the Chief Executive Officer and Managing Director of MyPloti, providing visionary leadership and strategic direction that continue to shape the company\'s success.',
        imageUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '2',
        name: 'Mercy Mburu',
        role: 'Sales Advisor',
        bio: 'Mercy is the Sales Advisor at MyPloti Construction with a background in finance and over 10 years of professional experience in customer service, real estate, and construction.',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '3',
        name: 'Sheila Wanaswa',
        role: 'Sales Executive',
        bio: 'Sheila has a strong background in customer relations and market development and plays a key role in connecting clients with the right solutions for their needs at MyPloti.',
        imageUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '4',
        name: 'Polly Njeru',
        role: 'Sales Executive',
        bio: 'Poly has years of experience in sales and client relationship management. She has built a reputation for her exceptional communication skills and unwavering commitment to client satisfaction.',
        imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '5',
        name: 'Sarah Mukami',
        role: 'Admin',
        bio: 'Highly organized Administrator with 5+ years in real estate management. Skilled in compliance, lease administration, vendor coordination, and ensuring efficient operations and client satisfaction.',
        imageUrl: 'https://images.unsplash.com/photo-1589386417686-0d34b5903d23?q=80&w=800&auto=format&fit=crop'
    }
];

export const COMPANY_TIMELINE: TimelineEvent[] = [
    {
        year: '2003',
        title: 'Foundation',
        description: 'MyPloti was founded with a single office in Nairobi and a mission to simplify land ownership.'
    },
    {
        year: '2010',
        title: 'Expansion',
        description: 'Expanded operations to Kiambu and Machakos counties, launching our first gated community project.'
    },
    {
        year: '2018',
        title: 'Construction Arm',
        description: 'Launched our construction division to offer end-to-end build solutions for our land clients.'
    },
    {
        year: '2023',
        title: 'Milestone Achievement',
        description: 'Celebrated 1,000+ happy title deed holders and over 45 completed home construction projects.'
    }
];

export const COLORS = {
  primary: '#007636',
  secondary: '#b96807',
  white: '#FFFFFF',
  grayLight: '#F3F4F6',
  textDark: '#1F2937'
};