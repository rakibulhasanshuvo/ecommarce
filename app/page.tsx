import Link from "next/link";
import { products } from "./lib/mock-data";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const featured = products;

  return (
    <main className="w-full flex-col animate-fade-in relative">
      
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="material-symbols-outlined text-[16px]">new_releases</span>
            New Fall Collection 2024
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
            Discover <span className="text-gradient">Extraordinary</span><br />
            Every Day.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Curated collections of premium electronics, fashion, and home goods tailored for the modern aesthete. Experience uncompromising quality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/collections" className="btn-primary px-8 py-4 text-sm w-full sm:w-auto text-center flex items-center justify-center gap-2">
              Shop All Products
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link href="/collections/fashion" className="px-8 py-4 rounded-xl border border-border-default hover:bg-white/5 hover:border-text-secondary transition-all text-sm font-bold text-white w-full sm:w-auto text-center">
              Explore Fashion
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-text-muted">
          <span className="text-xs uppercase tracking-widest font-semibold mb-2">Scroll</span>
          <span className="material-symbols-outlined text-[24px]">expand_more</span>
        </div>
      </section>

      {/* 2. Category Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Shop by <span className="text-primary">Category</span></h2>
            <p className="text-text-secondary">Find exactly what you're looking for.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Electonics */}
          <Link href="/collections/electronics" className="group relative h-80 rounded-3xl overflow-hidden glass glow-box">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop" alt="Electronics" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl font-bold mb-2">Electronics</h3>
              <p className="text-text-muted text-sm font-medium flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                Shop Now <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </p>
            </div>
          </Link>
          
          {/* Fashion */}
          <Link href="/collections/fashion" className="group relative h-80 rounded-3xl overflow-hidden glass glow-box">
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop" alt="Fashion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl font-bold mb-2">Apparel</h3>
              <p className="text-text-muted text-sm font-medium flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                Shop Now <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </p>
            </div>
          </Link>
          
          {/* Home */}
          <Link href="/collections" className="group relative h-80 rounded-3xl overflow-hidden glass glow-box">
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop" alt="Home Decor" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl font-bold mb-2">Home & Living</h3>
              <p className="text-text-muted text-sm font-medium flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                Shop Now <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="bg-white/5 border-y border-border-subtle py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Trending <span className="text-gradient">Now</span></h2>
              <p className="text-text-secondary">Handpicked styles guaranteed to elevate your daily routine.</p>
            </div>
            <Link href="/collections" className="px-6 py-2 rounded-full border border-border-default hover:bg-white/5 transition-colors text-sm font-bold flex items-center gap-2">
              View All <span className="material-symbols-outlined text-[16px]">trending_flat</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Value Propositions */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-24 border-b border-border-subtle">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-[32px]">local_shipping</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Free Global Delivery</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Enjoy complimentary carbon-neutral shipping on all orders over $200. We ship to over 150 countries worldwide.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <h3 className="text-xl font-bold mb-3">100% Authentic Quality</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Every item is meticulously sourced and verified for exceptional quality. Complete with standard 2-year warranty.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-[32px]">cached</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Hassle-free Returns</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Not completely satisfied? Return your purchase within 30 days for a full refund. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center py-24">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
          Ready to Upgrade Your <span className="text-gradient">Style?</span>
        </h2>
        <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
          Join 50,000+ members who receive early access to exclusive drops, limited edition pieces, and insider pricing.
        </p>
        <Link href="/collections" className="btn-primary px-10 py-4 text-lg inline-flex items-center gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow">
          Start Shopping Now
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </section>

    </main>
  );
}
