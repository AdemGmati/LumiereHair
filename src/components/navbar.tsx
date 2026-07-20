'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link';
import { CartSlider } from '@/components/cart/CartSlider';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    checkUser()
  }, [])
  
  const handleUserClick = () => {
    if (user) {
      router.push('/user/center')
    } else {
      router.push('/user/login')
    }
  }

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'HAIR SHOP', href: '/products' },
    { name: 'WIGS', href: '/products' },
    { name: 'CLIP-INS', href: '/products' },
    { name: 'NEW ARRIVALS', href: '/products' },
    { name: 'SALE', href: '/products' },
    { name: 'BLOG', href: '/products' },
  ];

  return (
    <>
      <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <nav className="bg-white border-b border-wigs-bg-alt">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-wigs-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-wigs-primary-dark hidden sm:inline" style={{ fontFamily: 'var(--font-display)' }}>
                Lumière hair
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 bg-wigs-bg-alt rounded-lg text-sm text-wigs-text-primary placeholder-wigs-text-secondary focus:outline-none focus:ring-2 focus:ring-wigs-primary"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-wigs-text-secondary w-4 h-4" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Currency Selector */}
              <button className="hidden sm:flex items-center gap-1 text-sm font-medium text-wigs-text-primary hover:text-wigs-primary transition">
                USD
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-wigs-text-primary hover:text-wigs-primary transition"
                aria-label="Open shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Account Icon */}
              <button
                onClick={handleUserClick}
                className="p-2 text-wigs-text-primary hover:text-wigs-primary transition cursor-pointer"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-wigs-text-primary hover:text-wigs-primary"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-wigs-text-primary hover:text-wigs-primary"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden pb-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 bg-wigs-bg-alt rounded-lg text-sm text-wigs-text-primary placeholder-wigs-text-secondary focus:outline-none focus:ring-2 focus:ring-wigs-primary"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-wigs-text-secondary w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-wigs-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex items-center justify-center gap-8 h-14">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-wigs-text-primary hover:text-wigs-primary transition whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="md:hidden py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-sm font-medium text-wigs-text-primary hover:text-wigs-primary py-2 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
