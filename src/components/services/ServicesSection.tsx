import { serviceCategories } from '../../constants';

const ServicesSection = () => {
  return (
    <section id="services" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl space-y-3">
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
            From essential services to earning opportunities.
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
            We're an all-in-one platform.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-gray-700">
          <button className="px-4 py-2 rounded-full bg-teal-900 text-white shadow-sm">
            Consumer
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
            Driver
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
            Merchant
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
            Enterprise
          </button>
        </div>

        <div className="mt-12 space-y-12">
          {serviceCategories.map((cat) => (
            <div key={cat.title} className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-900">
                {cat.title}
              </h3>
              <div className="divide-y divide-gray-200 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                {cat.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col md:flex-row md:items-center gap-4 px-5 md:px-6 py-5 bg-white"
                  >
                    <div className="flex items-center gap-4 md:w-1/3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-emerald-700" />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </div>
                    </div>
                    <p className="text-gray-700 md:flex-1 leading-relaxed">
                      {item.desc}
                    </p>
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

export default ServicesSection;
