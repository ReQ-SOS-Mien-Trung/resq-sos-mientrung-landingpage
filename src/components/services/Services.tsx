import {
  Briefcase,
  Building2,
  Bus,
  Car,
  Package,
  ShieldCheck,
  ShoppingBasket,
  Store,
  Utensils,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

const tabs = [
  {
    id: "consumer",
    label: "Consumer",
    groups: [
      {
        title: "Deliveries",
        items: [
          {
            icon: <Utensils className="w-10 h-10 text-emerald-600" />,
            name: "Food",
            description: "Have all your cravings delivered to your doorstep.",
          },
          {
            icon: <ShoppingBasket className="w-10 h-10 text-emerald-600" />,
            name: "Mart",
            description:
              "Find everything you need—groceries and more. Select your items and check out in a few taps.",
          },
          {
            icon: <Package className="w-10 h-10 text-emerald-600" />,
            name: "Express",
            description: "Send packages, documents, and beyond.",
          },
        ],
      },
      {
        title: "Mobility",
        items: [
          {
            icon: <Car className="w-10 h-10 text-emerald-600" />,
            name: "Rides",
            description:
              "Choose from a variety of vehicles to take you from A to B safely.",
          },
        ],
      },
      {
        title: "Financial Services",
        items: [
          {
            icon: <WalletCards className="w-10 h-10 text-emerald-600" />,
            name: "Pay",
            description:
              "Secure and seamless cashless payments, online and in-store.",
          },
          {
            icon: <ShieldCheck className="w-10 h-10 text-emerald-600" />,
            name: "Insurance",
            description:
              "Get everyday protection with accessible insurance offerings.",
          },
        ],
      },
    ],
  },
  {
    id: "driver",
    label: "Driver",
    groups: [
      {
        title: "Opportunities",
        items: [
          {
            icon: <Car className="w-10 h-10 text-emerald-600" />,
            name: "Rides",
            description:
              "Earn by driving passengers safely to their destination.",
          },
          {
            icon: <Package className="w-10 h-10 text-emerald-600" />,
            name: "Deliveries",
            description: "Earn on-demand income delivering food and parcels.",
          },
        ],
      },
    ],
  },
  {
    id: "merchant",
    label: "Merchant",
    groups: [
      {
        title: "Growth",
        items: [
          {
            icon: <Store className="w-10 h-10 text-emerald-600" />,
            name: "Online Storefront",
            description: "Bring your store online and reach more customers.",
          },
          {
            icon: <WalletCards className="w-10 h-10 text-emerald-600" />,
            name: "Payments",
            description: "Offer fast, secure payments in-store and online.",
          },
        ],
      },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    groups: [
      {
        title: "Business Solutions",
        items: [
          {
            icon: <Briefcase className="w-10 h-10 text-emerald-600" />,
            name: "Corporate Rides",
            description:
              "Safe, reliable transport options for teams and guests.",
          },
          {
            icon: <Building2 className="w-10 h-10 text-emerald-600" />,
            name: "Logistics",
            description:
              "Flexible delivery and fleet solutions for businesses.",
          },
          {
            icon: <Bus className="w-10 h-10 text-emerald-600" />,
            name: "Commute",
            description: "Daily commute programs tailored to your workforce.",
          },
        ],
      },
    ],
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === activeTab);

  return (
    <section id="services" className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
            style={{ fontFamily: "var(--font-sf-ui-display)" }}
          >
            From essential services to earning opportunities. We&apos;re an
            all-in-one platform.
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white border-gray-900"
                    : "text-gray-600 border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-0">
          {current?.groups.map((group, groupIndex) => (
            <div
              key={group.title}
              className={`grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-6 md:gap-8 lg:gap-12 py-8 md:py-10 ${
                groupIndex !== (current?.groups.length ?? 0) - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {group.title}
              </h3>
              <div className="space-y-0">
                {group.items.map((item, index) => (
                  <div
                    key={item.name}
                    className={`flex items-start gap-4 md:gap-6 py-4 md:py-5 ${
                      index !== group.items.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                        {item.name}
                      </div>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
