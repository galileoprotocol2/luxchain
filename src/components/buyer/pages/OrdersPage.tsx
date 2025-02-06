import React from 'react';
import { Package, Truck, Clock, CheckCircle, ArrowUpRight, MapPin } from 'lucide-react';

const mockOrders = [
  {
    id: '1',
    product: {
      name: 'Rolex Daytona',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
      price: 42500
    },
    status: 'delivered',
    date: '2024-03-15T10:30:00Z',
    tracking: {
      number: 'LX123456789FR',
      carrier: 'Brinks',
      status: 'delivered',
      location: 'Paris, France',
      events: [
        { date: '2024-03-15T10:30:00Z', status: 'delivered', location: 'Paris, France' },
        { date: '2024-03-14T16:45:00Z', status: 'in_transit', location: 'Charles de Gaulle Airport' },
        { date: '2024-03-13T08:30:00Z', status: 'shipped', location: 'Geneva, Switzerland' }
      ]
    }
  },
  {
    id: '2',
    product: {
      name: 'Bague Cartier',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80',
      price: 15800
    },
    status: 'in_transit',
    date: '2024-03-14T15:45:00Z',
    tracking: {
      number: 'LX123456790FR',
      carrier: 'Brinks',
      status: 'in_transit',
      location: 'Charles de Gaulle Airport',
      events: [
        { date: '2024-03-14T16:45:00Z', status: 'in_transit', location: 'Charles de Gaulle Airport' },
        { date: '2024-03-13T08:30:00Z', status: 'shipped', location: 'Milan, Italy' }
      ]
    }
  }
];

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'En attente',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  shipped: {
    icon: Package,
    label: 'Expédié',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  in_transit: {
    icon: Truck,
    label: 'En transit',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  delivered: {
    icon: CheckCircle,
    label: 'Livré',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }
};

export function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = React.useState(mockOrders[0]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light">Mes achats</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="col-span-1 space-y-4">
          {mockOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`w-full bg-white rounded-xl border p-4 text-left transition-all hover:shadow-md ${
                selectedOrder.id === order.id ? 'border-black' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={order.product.image}
                  alt={order.product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-1">{order.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {order.product.price.toLocaleString('fr-FR')} €
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {(() => {
                      const config = statusConfig[order.status as keyof typeof statusConfig];
                      const Icon = config.icon;
                      return (
                        <div className={`flex items-center space-x-1 text-sm ${config.color}`}>
                          <Icon className="h-4 w-4" />
                          <span>{config.label}</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Order Details */}
        <div className="col-span-2 space-y-6">
          {/* Product Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-start space-x-6">
              <img
                src={selectedOrder.product.image}
                alt={selectedOrder.product.name}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-medium mb-2">{selectedOrder.product.name}</h2>
                <p className="text-2xl font-light">
                  {selectedOrder.product.price.toLocaleString('fr-FR')} €
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  {(() => {
                    const config = statusConfig[selectedOrder.status as keyof typeof statusConfig];
                    const Icon = config.icon;
                    return (
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${config.bg} ${config.color}`}>
                        <Icon className="h-4 w-4" />
                        <span>{config.label}</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Tracking */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Suivi de livraison</h3>
                <div className="text-sm text-gray-600">
                  {selectedOrder.tracking.carrier} - {selectedOrder.tracking.number}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
                <div className="space-y-6">
                  {selectedOrder.tracking.events.map((event, index) => (
                    <div key={index} className="relative pl-10">
                      <div className={`absolute left-0 p-1 rounded-full ${
                        index === 0 ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}>
                        <MapPin className={`h-4 w-4 ${
                          index === 0 ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">
                            {statusConfig[event.status as keyof typeof statusConfig].label}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(event.date).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}