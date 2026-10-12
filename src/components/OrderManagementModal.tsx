import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderStatus, Order, Dress } from '../types';
import {
  X,
  Package,
  Layers,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  XCircle,
  Trash2,
  PlusCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const OrderManagementModal: React.FC = () => {
  const {
    orders,
    dresses,
    isOrderManagerOpen,
    setIsOrderManagerOpen,
    updateOrderStatus,
    deleteDress,
    updateDress,
    setIsAddDressModalOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  if (!isOrderManagerOpen) return null;

  const statuses: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'In Stitching / Processing',
    'Dispatched',
    'Delivered',
    'Cancelled',
  ];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount).replace('PKR', 'Rs.');
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatusFilter === 'All' || order.status === selectedStatusFilter;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      order.id.toLowerCase().includes(query) ||
      order.customer.fullName.toLowerCase().includes(query) ||
      order.customer.phone.includes(query) ||
      order.customer.city.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-3.5 h-3.5 text-amber-500" />;
      case 'Confirmed':
      case 'In Stitching / Processing':
        return <Layers className="w-3.5 h-3.5 text-blue-500" />;
      case 'Dispatched':
        return <Truck className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Delivered':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Cancelled':
        return <XCircle className="w-3.5 h-3.5 text-rose-500" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5 text-stone-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-5xl rounded-sm shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="font-serif text-2xl text-stone-900 font-medium">
              Merchant Store & Order Management
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage client orders, track delivery workflows, update stitching progress, and control dress inventory.
            </p>
          </div>
          <button
            onClick={() => setIsOrderManagerOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-stone-200 bg-stone-100 px-6 gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders Management ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Dress Inventory & Stock ({dresses.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'orders' ? (
            <div className="space-y-4">
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                {/* Search query */}
                <div className="relative flex-1 max-w-sm">
                  <input
                    type="text"
                    placeholder="Search by Order ID, customer, phone, city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs py-2 pl-8 pr-3 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-800"
                  />
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                </div>

                {/* Status Segmented Filters */}
                <div className="flex flex-wrap items-center gap-1 bg-stone-100 p-1 rounded">
                  {['All', ...statuses].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStatusFilter(st)}
                      className={`px-2.5 py-1 text-xs rounded transition-all cursor-pointer ${
                        selectedStatusFilter === st
                          ? 'bg-white text-stone-900 shadow-xs font-semibold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="border border-stone-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4 font-semibold">Order ID</th>
                      <th className="py-3 px-4 font-semibold">Customer</th>
                      <th className="py-3 px-4 font-semibold">Items</th>
                      <th className="py-3 px-4 font-semibold">Total Amount</th>
                      <th className="py-3 px-4 font-semibold">Payment</th>
                      <th className="py-3 px-4 font-semibold">Order Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-stone-400">
                          No orders found matching your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => {
                        const isExpanded = expandedOrderId === order.id;
                        return (
                          <React.Fragment key={order.id}>
                            <tr className="hover:bg-stone-50 transition-colors">
                              <td className="py-3 px-4 font-mono font-medium text-stone-900">
                                {order.id}
                                <div className="text-[10px] text-stone-400 font-sans">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-medium text-stone-900">{order.customer.fullName}</div>
                                <div className="text-[11px] text-stone-500 font-mono">
                                  {order.customer.phone} · {order.customer.city}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-stone-700">
                                  {order.items.length} {order.items.length === 1 ? 'dress' : 'dresses'}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono font-semibold tabular-nums text-stone-900">
                                {formatPrice(order.totalAmount)}
                              </td>
                              <td className="py-3 px-4 text-stone-600 text-[11px]">
                                {order.paymentMethod.replace(' (COD)', '')}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1.5">
                                  {getStatusIcon(order.status)}
                                  <select
                                    value={order.status}
                                    onChange={(e) =>
                                      updateOrderStatus(order.id, e.target.value as OrderStatus)
                                    }
                                    className="text-xs bg-white border border-stone-300 rounded px-2 py-1 font-medium text-stone-800 focus:outline-none focus:border-stone-800 cursor-pointer"
                                  >
                                    {statuses.map((s) => (
                                      <option key={s} value={s}>
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() =>
                                    setExpandedOrderId(isExpanded ? null : order.id)
                                  }
                                  className="text-stone-500 hover:text-stone-900 p-1 rounded hover:bg-stone-200 transition-colors cursor-pointer"
                                  title="View Full Invoice Details"
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 inline" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 inline" />
                                  )}
                                </button>
                              </td>
                            </tr>

                            {/* Expanded Order Detail View */}
                            {isExpanded && (
                              <tr className="bg-stone-50/80">
                                <td colSpan={7} className="p-4 border-b border-stone-200">
                                  <div className="bg-white border border-stone-200 rounded p-4 text-xs space-y-3">
                                    <div className="flex flex-wrap justify-between gap-4 border-b border-stone-100 pb-3">
                                      <div>
                                        <p className="font-semibold text-stone-800">
                                          Shipping & Delivery Details
                                        </p>
                                        <p className="text-stone-600 mt-1">
                                          {order.customer.fullName}
                                        </p>
                                        <p className="text-stone-500">
                                          {order.customer.address}, {order.customer.city}
                                        </p>
                                        <p className="text-stone-500 font-mono">
                                          Phone: {order.customer.phone} | Email: {order.customer.email || 'N/A'}
                                        </p>
                                        {order.customer.notes && (
                                          <p className="text-amber-800 mt-1 italic">
                                            Note: "{order.customer.notes}"
                                          </p>
                                        )}
                                      </div>

                                      <div className="text-right">
                                        <p className="text-stone-500">Courier Tracking Reference</p>
                                        <p className="font-mono font-semibold text-stone-900 mt-0.5">
                                          {order.trackingNumber}
                                        </p>
                                        <p className="text-stone-500 text-[11px] mt-1">
                                          Payment Mode: {order.paymentMethod}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Itemized Table */}
                                    <div>
                                      <p className="font-semibold text-stone-800 mb-2">Itemized Order Summary</p>
                                      <div className="space-y-1.5">
                                        {order.items.map((it, idx) => (
                                          <div
                                            key={idx}
                                            className="flex justify-between items-center bg-stone-50 p-2 rounded"
                                          >
                                            <div className="flex items-center gap-2">
                                              <img
                                                src={it.dress.images[0]}
                                                alt={it.dress.title}
                                                className="w-8 h-10 object-cover rounded-xs"
                                              />
                                              <div>
                                                <p className="font-medium text-stone-900">
                                                  {it.dress.title}
                                                </p>
                                                <p className="text-[11px] text-stone-500">
                                                  Size: {it.selectedSize} · {it.stitchingOption}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="font-mono text-stone-800">
                                              {it.quantity} x {formatPrice(it.dress.price)} ={' '}
                                              <span className="font-semibold">
                                                {formatPrice(it.dress.price * it.quantity)}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Inventory & Dress Management Tab */
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-stone-600">
                  Manage live prices, stock levels, and publish new dresses directly to the store catalog.
                </p>
                <button
                  onClick={() => setIsAddDressModalOpen(true)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add New Dress</span>
                </button>
              </div>

              <div className="border border-stone-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4 font-semibold">Dress</th>
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">Price</th>
                      <th className="py-3 px-4 font-semibold">Stock Count</th>
                      <th className="py-3 px-4 font-semibold">Availability</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {dresses.map((dress) => (
                      <tr key={dress.id} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={dress.images[0]}
                              alt={dress.title}
                              className="w-10 h-12 object-cover rounded-xs bg-stone-200"
                            />
                            <div>
                              <div className="font-serif font-medium text-stone-900 text-sm">
                                {dress.title}
                              </div>
                              <div className="text-[11px] text-stone-500">
                                {dress.fabric} · SKU: {dress.sku}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-stone-700">{dress.category}</td>
                        <td className="py-3 px-4 font-mono font-medium text-stone-900 tabular-nums">
                          {formatPrice(dress.price)}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums">
                          <input
                            type="number"
                            min="0"
                            value={dress.stockQuantity}
                            onChange={(e) =>
                              updateDress(dress.id, {
                                stockQuantity: Number(e.target.value),
                                inStock: Number(e.target.value) > 0,
                              })
                            }
                            className="w-16 px-2 py-1 border border-stone-300 rounded text-center text-xs"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() =>
                              updateDress(dress.id, { inStock: !dress.inStock })
                            }
                            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                              dress.inStock
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {dress.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => deleteDress(dress.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1 rounded hover:bg-stone-100 cursor-pointer"
                            title="Delete Dress Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
