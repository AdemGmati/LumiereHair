import Image from 'next/image';
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    description: string;
    image_url: string;
}

export function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                {/* Image */}
                <Image src={product.image_url} alt={product.name} width={400} height={400} loading="eager" />

                {/* Content */}
                <div className="p-5">
                    <h3 className="font-playfair text-xl text-wigs-text-primary mb-2">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Action Button */}
                    <button className="w-full bg-wigs-primary text-white py-2 rounded-md font-poppins font-medium hover:bg-opacity-90 transition">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
}