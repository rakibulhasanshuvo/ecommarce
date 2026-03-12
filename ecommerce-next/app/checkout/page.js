"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { formatPrice } from "@/app/lib/mock-data";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, tax, shippingCost, discountAmount, total, clearCart } = useCart();
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "", lastName: "", address: "", city: "", zip: "", email: ""
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "", expDate: "", cvv: "", nameOnCard: ""
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setStep(3);
    }, 2000);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/collections" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  // --- Step 3: Success ---
  if (step === 3) {
    return (
      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-20 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl text-success">
            check_circle
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-text-secondary mb-8">
          Thank you, {shippingInfo.firstName || "Customer"}. Your order #LX-{Math.floor(Math.random() * 90000) + 10000} has been placed successfully. 
          We'll send a confirmation email to {shippingInfo.email} shortly.
        </p>
        <Link href="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Side — Forms */}
        <div className="flex-1">
          {/* Breadcrumb Steps */}
          <div className="flex items-center justify-between mb-8 max-w-sm relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-border-subtle -z-10 -translate-y-1/2" />
            
            <div className="flex flex-col items-center gap-2 bg-background-dark px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${step >= 1 ? "bg-primary text-white" : "bg-white/10 text-text-muted"}`}>
                1
              </div>
              <span className={`text-xs ${step >= 1 ? "text-primary" : "text-text-muted"}`}>Shipping</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 bg-background-dark px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${step >= 2 ? "bg-primary text-white" : "bg-white/10 text-text-muted"}`}>
                2
              </div>
              <span className={`text-xs ${step >= 2 ? "text-primary" : "text-text-muted"}`}>Payment</span>
            </div>
          </div>

          {/* Step 1: Shipping */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="glass p-6 rounded-2xl animate-fade-in">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" value={shippingInfo.firstName} onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})} className="input-field" />
                <input required type="text" placeholder="Last Name" value={shippingInfo.lastName} onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})} className="input-field" />
                <input required type="email" placeholder="Email Address" value={shippingInfo.email} onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})} className="input-field md:col-span-2" />
                <input required type="text" placeholder="Street Address" value={shippingInfo.address} onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})} className="input-field md:col-span-2" />
                <input required type="text" placeholder="City" value={shippingInfo.city} onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})} className="input-field" />
                <input required type="text" placeholder="ZIP Code" value={shippingInfo.zip} onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})} className="input-field" />
              </div>
              <button type="submit" className="btn-primary w-full mt-8 py-3">
                Continue to Payment
              </button>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="glass p-6 rounded-2xl animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Payment Details</h2>
                <button type="button" onClick={() => setStep(1)} className="text-sm text-text-muted hover:text-text-primary transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Cardholder Name" value={paymentInfo.nameOnCard} onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})} className="input-field md:col-span-2" />
                
                <div className="relative md:col-span-2">
                  <input required type="text" maxLength="19" placeholder="Card Number (e.g. 4111 1111 1111 1111)" value={paymentInfo.cardNumber} onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})} className="input-field pl-10 w-full" />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">credit_card</span>
                </div>
                
                <input required type="text" maxLength="5" placeholder="MM/YY" value={paymentInfo.expDate} onChange={(e) => setPaymentInfo({...paymentInfo, expDate: e.target.value})} className="input-field" />
                <input required type="text" maxLength="4" placeholder="CVV" value={paymentInfo.cvv} onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})} className="input-field" />
              </div>
              
              <button type="submit" disabled={isProcessing} className="btn-primary w-full mt-8 py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">lock</span>
                    Pay {formatPrice(total)}
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Right Side — Order Summary */}
        <div className="lg:w-[400px]">
          <div className="glass p-6 rounded-2xl sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            
            {/* Minimal Item List */}
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
              {items.map((item) => (
                <div key={item.variant.sku} className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg bg-white/5 border border-border-default overflow-hidden relative">
                    <img src={item.product.images[0]?.url} alt="" className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-text-primary text-background-dark text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-sm font-semibold line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-text-secondary">{formatPrice(item.variant.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-border-subtle mb-4" />

            {/* Totals */}
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <hr className="border-border-subtle my-4" />
            
            <div className="flex justify-between items-end">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-primary">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
