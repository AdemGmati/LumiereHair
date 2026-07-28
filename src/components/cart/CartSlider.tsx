'use client';

import { X, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageProvider';

interface CartSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSlider({ isOpen, onClose }: CartSliderProps) {
  const { cartItems, removeItem, updateQuantity, total } = useCart();
  const { t, locale } = useLanguage();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slider */}
      <div
        className={`fixed top-0 end-0 h-screen w-full max-w-md bg-white z-50 flex flex-col shadow-lg transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : locale === 'ar' ? '-translate-x-full' : 'translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-wigs-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            {t('cart.title') as string}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            aria-label={t('common.closeMenu') as string}
          >
            <X size={24} className="text-wigs-text-primary" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-wigs-text-secondary">{t('cart.empty') as string}</p>
              <p className="text-gray-400 text-sm mt-1">
                {t('cart.emptyCopy') as string}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selected_lenght}-${item.selected_colors}`}
                  className="flex gap-4 pb-6 border-b border-gray-200"
                >
                  {/* Item Image */}
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-wigs-bg-alt">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 text-center">{t('common.products') as string}</span>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-wigs-text-primary mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-wigs-text-secondary mb-2">
                      {item.selected_lenght} · {item.selected_colors}
                    </p>
                    <p className="text-wigs-primary font-semibold text-sm mb-3">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selected_lenght,
                            item.selected_colors,
                            item.quantity - 1
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label={t('common.decreaseQuantity') as string}
                      >
                        <Minus size={16} className="text-wigs-text-secondary" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selected_lenght,
                            item.selected_colors,
                            item.quantity + 1
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label={t('common.increaseQuantity') as string}
                      >
                        <Plus size={16} className="text-wigs-text-secondary" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="text-xs text-wigs-text-secondary mb-3">
                      {t('common.subtotal') as string}: ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        removeItem(item.id, item.selected_lenght, item.selected_colors)
                      }
                      className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={14} />
                      {t('cart.remove') as string}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-wigs-text-secondary">{t('cart.subtotal') as string}</span>
              <span className="font-semibold text-lg text-wigs-text-primary">
                ${total.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-wigs-text-secondary">
              {t('cart.shippingNotice') as string}
            </p>

            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-md transition-all duration-200 text-center block"
            >
              {t('cart.proceedToCheckout') as string}
            </Link>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-wigs-text-primary font-medium py-3 rounded-md transition-colors duration-200"
            >
              {t('cart.continueShopping') as string}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
