export const EXPERT_AI_STUDIO_PROMPT = `Build a high-end, production-ready, full-stack luxury Women's Clothing E-Commerce application named "Zahra Atelier" (Haute Couture & Women's Fashion House) using React 19, TypeScript, Tailwind CSS, Lucide icons, and modern state architecture.

The application must deliver an editorial luxury boutique shopping experience and a comprehensive merchant administration console with persistent browser storage (localStorage with real-time reactive sync).

### 1. CORE DOMAIN TAXONOMY & PRODUCT SUITE (All Dress Categories)
Provide pre-loaded, catalog-ready dresses with high-resolution imagery and specifications for all major women's wear categories:
- Bridal & Haute Couture (Royal Zardozi Lehengas, Maxi Gowns, Walima Formals, Hand-embroidered Cholis)
- Luxury Pret & Ready-to-Wear (Pure Raw Silk Tunics, Embroidered Kurtis, Straight Trousers, Organza Duos)
- Luxury Lawn & Summer Editions (3-Piece Schiffli Lawn, Voile, Digital Printed Organza & Chiffon Dupattas)
- Festive & Formals (Pure 9000 Micro Velvet Peshwas, Zari & Antique Tilla Needlework, Net Sarees)
- Modest Wear & Abayas (Embroidered Dubai Nida Kaftans, Kimono-cut Abayas, Coordinated Georgette Hijabs)
- Western & Contemporary Fusion (Minimalist Belted Trench Dresses, Co-ord Sets, Flowy Silk Robes)

Each dress must contain:
- Unique ID, SKU, Title, Category, Fabric Details, Color, Detailed Editorial Prose
- Tabular Pricing (Rs. / PKR format), Original Price, Discount percentage
- Available Sizes (XS, S, M, L, XL, Custom Stitching option with bespoke measurements)
- Stitching Options: 'Ready to Wear (Stitched)' and 'Unstitched (3-Piece / Fabric)'
- Stock Quantity and Real-time Inventory availability indicator
- High-fidelity visual gallery with image fallback resilience
- Rating (1-5 stars), review count, craft details list, and care guide

### 2. CUSTOMER EXPERIENCE & SHOPPING ENGINE
- **Luxury Navigation**: Top bar with wordmark, category jump links, live search bar, cart badge counter, and quick action controls.
- **Product Filtering & Sorting**: Segmented category filter tabs, fabric filter, price range slider, sort by newest/price/rating, and instant query search.
- **Product Detail Modal (PDP)**: Contiguous purchase module with sticky gallery, size selector, stitching mode picker, quantity stepper, fabric specifications, artisanal care notes, and "Add to Cart" with immediate visual feedback.
- **Cart & Slide-over Bag Drawer**:
  * Real-time itemized list with size/stitching labels and quantity increment/decrement/remove.
  * Free Delivery progress bar (e.g. Free shipping on orders above Rs. 20,000).
  * Promo Coupon code engine (e.g. 'ZAHRA10' for 10% off, 'EID2026' for Rs. 2,000 off).
  * Subtotal, discount calculations, delivery fee, and net total breakdown.
  * Instant checkout initiation.
- **Checkout & Order Placement Flow**:
  * Multi-step customer shipping verification (Full Name, Phone/WhatsApp, Email, Street Address, City, Postal Code, Special Instructions).
  * Real-time Payment options: Cash on Delivery (COD), Online Card / Bank Transfer, JazzCash / EasyPaisa.
  * Instant Order Placement: Generates unique tracking number (e.g. ORD-98214), dispatches order to the Order Management Hub, shows clean invoice receipt with print/save capability.

### 3. ADMIN / SELLER STORE MANAGEMENT PORTAL
Provide an accessible Store Management Console accessible via the navigation:
- **Feature A: "Add New Dress / Manage Inventory"**:
  * Comprehensive form to add new dress listings: Dress Title, Category selector, Fabric, Base Price, Discount/Original Price, Available Sizes checkboxes, Stitching options, Stock quantity, Image URL / presets, Color, and Craft description.
  * Live inventory catalog table: In-stock toggle, stock counter, direct edit, and delete functionality with instant client state persistence.
- **Feature B: "Order Management Hub"**:
  * Live orders overview table showing: Order ID, Date/Time, Customer Name, Phone, Delivery City, Total Amount, Payment Method, and Status.
  * Filter orders by status: All, Pending, Confirmed, In Stitching / Processing, Dispatched, Delivered, Cancelled.
  * Order status updater: Admin can change order status with 1 click.
  * Printable order summary/invoice drawer with itemized dress units, customer details, and shipping address.

### 4. CUSTOMER FEEDBACK & REVIEWS SYSTEM
- **Public Feedback Showcase**: Average rating summary score, star distribution breakdown, and testimonials list with verified buyer badges.
- **Submit Feedback Modal**: Customer review modal enabling users to select the dress purchased (or general brand feedback), star rating (1 to 5), customer name, city, review comment, and "Would recommend to others" toggle.
- **Helpful Vote & Filter**: Sort feedback by rating or search reviews by keyword.

### 5. DESIGN & ARCHITECTURAL DISCIPLINE
- Adhere strictly to the Universal Frontend Design Constitution:
  * Zero-Pill discipline: static metadata uses clean unboxed text with typographic dot separators (·).
  * 3-Zone Top Bar contract: Brand wordmark in single element, clean text nav links, primary action triggers.
  * High-contrast editorial typography: Cormorant Garamond / serif display headings paired with clean Plus Jakarta Sans body prose and tabular numerals for financial figures.
  * Zero dead clicks: Every button, filter, tab, and card interaction has working state.
  * Mobile responsive layout with touch-friendly controls.`;

export const EXPERT_PROMPT_URDU_EXPLANATION = `Yeh aik 20 saal k Senior Software Architect level ka Master Prompt hai jo Google AI Studio k liye specially design kia gya hai. Is prompt mai:
1. Tamam types k women dresses (Bridal, Pret, Luxury Lawn, Velvet Formals, Abayas, Fusion) shamil hain.
2. Naya dress add krny ka seller form or inventory control majood hai.
3. Order manage krny ka complete dashboard (Pending, In Stitching, Dispatched, Delivered status) shamil hai.
4. Add to cart drawer, coupon code, or step-by-step Cash on Delivery (COD) order place krny ka checkout system hai.
5. Customer reviews & star ratings ka feedback module integrated hai.
Aap is prompt ko copy kr k Google AI Studio mai paste karein ge to AI studio aik complete, high-end e-commerce website develop kr dega.`;
