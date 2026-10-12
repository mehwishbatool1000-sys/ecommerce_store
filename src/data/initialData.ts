import { Dress, Order, Review } from '../types';

import heroBridalImg from '../assets/images/hero_bridal_couture_1791437581649.jpg';
import pretFormalImg from '../assets/images/dress_pret_formal_1791437594449.jpg';
import luxuryLawnImg from '../assets/images/dress_luxury_lawn_1791437608969.jpg';
import festiveVelvetImg from '../assets/images/dress_festive_velvet_1791437623829.jpg';

export const INITIAL_DRESSES: Dress[] = [
  {
    id: 'dr-01',
    sku: 'ZA-BR-101',
    title: 'Noor-e-Aroos Royal Zardozi Bridal Lehenga',
    category: 'Bridal & Couture',
    fabric: 'Pure French Raw Silk & Tissue Organza',
    description: 'An ethereal scarlet red and antique gold bridal lehenga handcrafted with centuries-old Zardozi, Naqshi, dabka, and pearl embellishments. Paired with a heavy artisanal embroidered dupatta and hand-worked choli.',
    price: 185000,
    originalPrice: 210000,
    availableSizes: ['S', 'M', 'L', 'Custom'],
    stitchingOptions: ['Ready to Wear (Stitched)', 'Unstitched (3-Piece)'],
    inStock: true,
    stockQuantity: 4,
    images: [heroBridalImg, pretFormalImg],
    color: 'Crimson Red & Antique Gold',
    featured: true,
    rating: 4.9,
    reviewsCount: 38,
    craftDetails: ['Handcrafted Zardozi & Vasli needlework', 'Pure 80g Raw Silk Canvas', 'Double Dupatta Styling Option', 'Artisan hand-embroidery 280+ hours'],
    careGuide: 'Dry clean only by couture garment specialists. Store wrapped in muslin cloth.'
  },
  {
    id: 'dr-02',
    sku: 'ZA-PR-204',
    title: 'Emerald Mehrunisa Embroidered Raw Silk Pret',
    category: 'Luxury Pret',
    fabric: 'Premium Korean Raw Silk',
    description: 'Rich jewel-toned emerald green long-cut silhouette adorned with delicate pita embroidery, cutwork sleeves, and scalloped hemline. Paired with straight tailored trousers and a contrasting printed silk dupatta.',
    price: 28500,
    originalPrice: 32000,
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    stitchingOptions: ['Ready to Wear (Stitched)'],
    inStock: true,
    stockQuantity: 12,
    images: [pretFormalImg, luxuryLawnImg],
    color: 'Emerald Jewel Green',
    featured: true,
    rating: 4.8,
    reviewsCount: 46,
    craftDetails: ['Fine Golden Dabka & Sequence Work', 'Contemporary Straight A-line Silhouette', 'Organza Insertion on Sleeves', 'Silk Lining Included'],
    careGuide: 'Dry clean recommended. Gentle hand steam iron on reverse side.'
  },
  {
    id: 'dr-03',
    sku: 'ZA-LW-308',
    title: 'Gul-e-Bahar Pastel Lilac Luxury Lawn Suit',
    category: 'Luxury Lawn',
    fabric: 'Swiss Voile Lawn & Jacquard Organza',
    description: 'A breathtaking lilac summer ensemble featuring intricate schiffli embroidery along the neckline and front panels. Finished with floral thread work, lace borders, and a lightweight printed digital organza dupatta.',
    price: 16500,
    originalPrice: 18900,
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    stitchingOptions: ['Ready to Wear (Stitched)', 'Unstitched (3-Piece)'],
    inStock: true,
    stockQuantity: 28,
    images: [luxuryLawnImg, pretFormalImg],
    color: 'Pastel Lilac & Pearl White',
    featured: true,
    rating: 4.7,
    reviewsCount: 52,
    craftDetails: ['100% Breathable Combed Egyptian Cotton Lawn', 'Laser-cut Schiffli Neckline Motif', 'Embroidered Border Patches Included', 'Printed Pure Organza Dupatta (2.75m)'],
    careGuide: 'Hand wash cold or gentle cycle. Do not bleach. Dry in partial shade.'
  },
  {
    id: 'dr-04',
    sku: 'ZA-FV-402',
    title: 'Shab-e-Mehtab Midnight Navy Micro Velvet Formal',
    category: 'Festive & Formals',
    fabric: 'Pure 9000 Micro Velvet & Crushed Silk',
    description: 'Deep midnight navy blue velvet formal peshwas ornamented with traditional antique tilla embroidery, marori stitch, and sequined flare. Completed with crushed raw silk culottes and a sheer net dupatta.',
    price: 44000,
    originalPrice: 49500,
    availableSizes: ['S', 'M', 'L', 'XL'],
    stitchingOptions: ['Ready to Wear (Stitched)'],
    inStock: true,
    stockQuantity: 8,
    images: [festiveVelvetImg, heroBridalImg],
    color: 'Midnight Navy Blue',
    featured: true,
    rating: 5.0,
    reviewsCount: 29,
    craftDetails: ['Luxurious Plush 9000 Micro Velvet', 'Gold and Copper Tilla Weave', 'High-density Gota Border Finishing', 'Inner Charmeuse Silk Lining'],
    careGuide: 'Professional dry cleaning only. Do not iron directly on velvet pile.'
  },
  {
    id: 'dr-05',
    sku: 'ZA-AB-512',
    title: 'Sultana Embroidered Kaftan & Modest Abaya',
    category: 'Modest & Abayas',
    fabric: 'Luxury Dubai Nida & Fine Chiffon',
    description: 'An elegant open-front ceremonial kaftan crafted from breathable, drape-rich Dubai Nida fabric with hand-embellished crystal cuffs and flowing pleated sleeves. Includes coordinated inner slip and premium georgette hijab.',
    price: 22000,
    originalPrice: 25000,
    availableSizes: ['S', 'M', 'L', 'XL', 'Custom'],
    stitchingOptions: ['Ready to Wear (Stitched)'],
    inStock: true,
    stockQuantity: 15,
    images: [pretFormalImg, festiveVelvetImg],
    color: 'Charcoal Noir & Muted Champagne',
    featured: false,
    rating: 4.9,
    reviewsCount: 31,
    craftDetails: ['Original Crease-Resistant Dubai Nida Fabric', 'Hand-sewn Japanese Cut Beads', 'Includes Coordinated Premium Sheer Hijab', 'Full Length Modest Cut with Concealed Snap Buttons'],
    careGuide: 'Machine wash on delicate cycle in laundry bag or dry clean.'
  },
  {
    id: 'dr-06',
    sku: 'ZA-WF-603',
    title: 'Sahara Dune Belted Co-Ord Fusion Trench Dress',
    category: 'Western Fusion',
    fabric: 'Textured Linen & Viscose Twill',
    description: 'Modern minimalist silhouette inspired by contemporary runway tailoring. Features a sharp notch collar, asymmetric storm flap, self-fabric buckle belt, and relaxed pleated trousers designed for cosmopolitan elegance.',
    price: 19800,
    originalPrice: 22500,
    availableSizes: ['XS', 'S', 'M', 'L'],
    stitchingOptions: ['Ready to Wear (Stitched)'],
    inStock: true,
    stockQuantity: 18,
    images: [luxuryLawnImg, pretFormalImg],
    color: 'Warm Almond Sand',
    featured: false,
    rating: 4.6,
    reviewsCount: 19,
    craftDetails: ['Heavy Drape Linen-Viscose Blend', 'Tortoiseshell Effect Hardware', 'Deep Functional Pockets', 'Removable Sculptural Waist Belt'],
    careGuide: 'Dry clean or gentle cold wash. Iron with damp press cloth.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9421',
    trackingNumber: 'TCS-908234-PK',
    customer: {
      fullName: 'Ayesha Siddiqui',
      email: 'ayesha.siddiqui@gmail.com',
      phone: '+92 300 8492019',
      address: 'House 42-B, Sector F-7/2',
      city: 'Islamabad',
      postalCode: '44000',
      notes: 'Please call before delivery. Ring upper floor bell.'
    },
    items: [
      {
        id: 'dr-02-M-Stitched',
        dress: INITIAL_DRESSES[1],
        selectedSize: 'M',
        stitchingOption: 'Ready to Wear (Stitched)',
        quantity: 1
      }
    ],
    subtotal: 28500,
    shippingFee: 0,
    discountAmount: 2850,
    totalAmount: 25650,
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'In Stitching / Processing',
    createdAt: '2026-10-06T14:22:00.000Z',
    updatedAt: '2026-10-07T09:15:00.000Z'
  },
  {
    id: 'ORD-9388',
    trackingNumber: 'LEO-441092-PK',
    customer: {
      fullName: 'Fatima Zahra Khan',
      email: 'fatima.zkhan@outlook.com',
      phone: '+92 321 4451098',
      address: 'Apartment 5A, Creek Vista, Phase 8 DHA',
      city: 'Karachi',
      postalCode: '75500',
      notes: 'Deliver during daytime office hours if possible.'
    },
    items: [
      {
        id: 'dr-03-S-Unstitched',
        dress: INITIAL_DRESSES[2],
        selectedSize: 'S',
        stitchingOption: 'Unstitched (3-Piece)',
        quantity: 2
      }
    ],
    subtotal: 33000,
    shippingFee: 0,
    discountAmount: 0,
    totalAmount: 33000,
    paymentMethod: 'Debit / Credit Card',
    status: 'Dispatched',
    createdAt: '2026-10-05T11:40:00.000Z',
    updatedAt: '2026-10-06T16:00:00.000Z'
  },
  {
    id: 'ORD-9310',
    trackingNumber: 'TCS-110294-PK',
    customer: {
      fullName: 'Mahnoor Bilal',
      email: 'mahnoor.bilal@yahoo.com',
      phone: '+92 333 5521990',
      address: 'Plot 18, Block G, Gulberg III',
      city: 'Lahore',
      postalCode: '54000'
    },
    items: [
      {
        id: 'dr-04-L-Stitched',
        dress: INITIAL_DRESSES[3],
        selectedSize: 'L',
        stitchingOption: 'Ready to Wear (Stitched)',
        quantity: 1
      }
    ],
    subtotal: 44000,
    shippingFee: 0,
    discountAmount: 4400,
    totalAmount: 39600,
    paymentMethod: 'JazzCash / EasyPaisa Bank Transfer',
    status: 'Delivered',
    createdAt: '2026-10-02T10:15:00.000Z',
    updatedAt: '2026-10-05T17:30:00.000Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    dressId: 'dr-01',
    dressTitle: 'Noor-e-Aroos Royal Zardozi Bridal Lehenga',
    customerName: 'Zainab Tariq',
    city: 'Lahore',
    rating: 5,
    comment: 'SubhanAllah, the detailing on this bridal ensemble is even more magnificent in person than in the pictures! The craftsmanship is pure luxury and the handwork sparkles under banquet lights.',
    verified: true,
    createdAt: '2026-09-28T12:00:00.000Z',
    recommended: true
  },
  {
    id: 'rev-02',
    dressId: 'dr-02',
    dressTitle: 'Emerald Mehrunisa Embroidered Raw Silk Pret',
    customerName: 'Hira Naveed',
    city: 'Karachi',
    rating: 5,
    comment: 'The stitching fit was absolutely tailored to perfection. Pure raw silk feels so breathable and regal. Dispatched quickly with luxury magnetic packaging.',
    verified: true,
    createdAt: '2026-10-01T15:30:00.000Z',
    recommended: true
  },
  {
    id: 'rev-03',
    dressId: 'dr-03',
    dressTitle: 'Gul-e-Bahar Pastel Lilac Luxury Lawn Suit',
    customerName: 'Nadia Qasim',
    city: 'Islamabad',
    rating: 4,
    comment: 'Fabric quality is 10/10. The organza dupatta adds such a poetic, feminine vibe. Highly recommended for daytime high teas and summer dholkis.',
    verified: true,
    createdAt: '2026-10-03T09:45:00.000Z',
    recommended: true
  },
  {
    id: 'rev-04',
    customerName: 'Samina Asghar',
    city: 'Faisalabad',
    rating: 5,
    comment: 'I ordered via Cash on Delivery and received updates on WhatsApp. Everything was packed flawlessly with dust bags and extra buttons. Best designer boutique experience online.',
    verified: true,
    createdAt: '2026-10-04T18:20:00.000Z',
    recommended: true
  }
];
