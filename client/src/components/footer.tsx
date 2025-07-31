import { motion } from "framer-motion";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const target = document.querySelector(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const services = [
    "Custom Fabrication",
    "Service & Repair", 
    "Performance Upgrades",
    "Parts & Accessories",
    "TCC Swag Store"
  ];

  return (
    <footer className="bg-tcc-black border-t-4 border-tcc-orange py-16 relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6600' fill-opacity='0.04'%3E%3Cpath d='M60 60L0 0h120L60 60zM0 120h120L60 60z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div 
              className="bg-tcc-dark-gray border-2 border-steel/40 p-6 mb-6 relative flex justify-center items-center"
              style={{
                clipPath: 'polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)'
              }}
            >
              <img src="/images/logo_tcc-primary.png" alt="Turkey Creek Cycles" className="h-auto w-80" />
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md font-inter leading-relaxed">
              Specializing in American V-Twin motorcycle fabrication, service, and performance work 
              since 2008. Your premier custom motorcycle shop in Leavenworth County, Kansas.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/TurkeyCreekCycles"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tcc-orange/20 border-2 border-tcc-orange/40 p-3 text-tcc-orange hover:bg-tcc-orange hover:text-tcc-black transition-all duration-300 relative group"
                style={{
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
                }}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <div className="absolute inset-0 metallic-gradient opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div 
              className="bg-tcc-orange text-tcc-black px-4 py-2 mb-4 w-fit relative"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 100%, 12px 100%)'
              }}
            >
              <h3 className="font-oswald text-lg font-bold tracking-widest">QUICK LINKS</h3>
              <div className="absolute inset-0 metallic-gradient opacity-30"></div>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-tcc-orange transition-colors font-inter hover:translate-x-1 transform duration-200 block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div 
              className="bg-tcc-orange text-tcc-black px-4 py-2 mb-4 w-fit relative"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 100%, 12px 100%)'
              }}
            >
              <h3 className="font-oswald text-lg font-bold tracking-widest">SERVICES</h3>
              <div className="absolute inset-0 metallic-gradient opacity-30"></div>
            </div>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-tcc-orange transition-colors font-inter hover:translate-x-1 transform duration-200 block">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t-2 border-steel mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div 
            className="bg-tcc-dark-gray border border-steel/40 px-6 py-3 mb-4 md:mb-0 relative"
            style={{
              clipPath: 'polygon(15px 0%, calc(100% - 15px) 0%, 100% 100%, 0% 100%)'
            }}
          >
            <p className="text-gray-400 text-sm font-inter">
              © 2024 Turkey Creek Cycles. All rights reserved. Established 2008.
            </p>
            <div className="absolute inset-0 metallic-gradient opacity-5"></div>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-tcc-orange transition-colors text-sm font-inter hover:translate-y-[-2px] transform duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-tcc-orange transition-colors text-sm font-inter hover:translate-y-[-2px] transform duration-200">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
