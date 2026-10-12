import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dress, CartItem, Order, Review, DressSize, StitchingOption, OrderStatus, PaymentMethod, CustomerDetails } from '../types';
import { INITIAL_DRESSES, INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/initialData';

interface StoreContextType {
  dresses: Dress[];
  orders: Order[];
  reviews: Review[];
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addDress: (dress: Omit<Dress, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateDress: (id: string, updates: Partial<Dress>) => void;
  deleteDress: (id: string) => void;
  addToCart: (dress: Dress, selectedSize: DressSize, stitchingOption: StitchingOption, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  placeOrder: (customer: CustomerDetails, paymentMethod: PaymentMethod, couponDiscount?: number) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  // UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedDressForModal: Dress | null;
  setSelectedDressForModal: (dress: Dress | null) => void;
  isAddDressModalOpen: boolean;
  setIsAddDressModalOpen: (open: boolean) => void;
  isOrderManagerOpen: boolean;
  setIsOrderManagerOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (open: boolean) => void;
  isPromptStudioOpen: boolean;
  setIsPromptStudioOpen: (open: boolean) => void;
  latestPlacedOrder: Order | null;
  setLatestPlacedOrder: (order: Order | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dresses, setDresses] = useState<Dress[]>(() => {
    try {
      const saved = localStorage.getItem('zahra_dresses');
      return saved ? JSON.parse(saved) : INITIAL_DRESSES;
    } catch {
      return INITIAL_DRESSES;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zahra_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('zahra_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zahra_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal and navigation states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDressForModal, setSelectedDressForModal] = useState<Dress | null>(null);
  const [isAddDressModalOpen, setIsAddDressModalOpen] = useState(false);
  const [isOrderManagerOpen, setIsOrderManagerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isPromptStudioOpen, setIsPromptStudioOpen] = useState(false);
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem('zahra_dresses', JSON.stringify(dresses));
  }, [dresses]);

  useEffect(() => {
    localStorage.setItem('zahra_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zahra_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('zahra_cart', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.dress.price * item.quantity, 0);

  const addDress = (newDressData: Omit<Dress, 'id' | 'rating' | 'reviewsCount'>) => {
    const newDress: Dress = {
      ...newDressData,
      id: `dr-${Date.now().toString(36)}`,
      rating: 5.0,
      reviewsCount: 0,
    };
    setDresses(prev => [newDress, ...prev]);
  };

  const updateDress = (id: string, updates: Partial<Dress>) => {
    setDresses(prev => prev.map(d => (d.id === id ? { ...d, ...updates } : d)));
  };

  const deleteDress = (id: string) => {
    setDresses(prev => prev.filter(d => d.id !== id));
    setCart(prev => prev.filter(item => item.dress.id !== id));
  };

  const addToCart = (
    dress: Dress,
    selectedSize: DressSize,
    stitchingOption: StitchingOption,
    quantity = 1
  ) => {
    const cartItemId = `${dress.id}-${selectedSize}-${stitchingOption}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          dress,
          selectedSize,
          stitchingOption,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (
    customer: CustomerDetails,
    paymentMethod: PaymentMethod,
    couponDiscount = 0
  ): Order => {
    const subtotal = cartSubtotal;
    const shippingFee = subtotal > 20000 ? 0 : 450;
    const totalAmount = Math.max(0, subtotal - couponDiscount + shippingFee);
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const trackingPrefix = paymentMethod.includes('COD') ? 'TCS' : 'LEO';

    const newOrder: Order = {
      id: `ORD-${orderNumber}`,
      trackingNumber: `${trackingPrefix}-${Math.floor(100000 + Math.random() * 900000)}-PK`,
      customer,
      items: [...cart],
      subtotal,
      shippingFee,
      discountAmount: couponDiscount,
      totalAmount,
      paymentMethod,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);
    setLatestPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [newRev, ...prev]);

    // Update dress rating if dressId is provided
    if (reviewData.dressId) {
      setDresses(prev =>
        prev.map(d => {
          if (d.id === reviewData.dressId) {
            const nextCount = (d.reviewsCount || 0) + 1;
            const nextRating = Number(
              (((d.rating || 5) * (d.reviewsCount || 0) + reviewData.rating) / nextCount).toFixed(1)
            );
            return {
              ...d,
              rating: nextRating,
              reviewsCount: nextCount,
            };
          }
          return d;
        })
      );
    }
  };

  return (
    <StoreContext.Provider
      value={{
        dresses,
        orders,
        reviews,
        cart,
        cartCount,
        cartSubtotal,
        addDress,
        updateDress,
        deleteDress,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        addReview,
        isCartOpen,
        setIsCartOpen,
        selectedDressForModal,
        setSelectedDressForModal,
        isAddDressModalOpen,
        setIsAddDressModalOpen,
        isOrderManagerOpen,
        setIsOrderManagerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isFeedbackModalOpen,
        setIsFeedbackModalOpen,
        isPromptStudioOpen,
        setIsPromptStudioOpen,
        latestPlacedOrder,
        setLatestPlacedOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
