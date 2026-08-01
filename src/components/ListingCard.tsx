import { useMemo, useState } from "react";
import type { Listing } from "../types";
import telegramLogo from "../assets/telegram-logo.svg"

interface ListingCardProps {
    listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
    const [currentImage, setCurrentImage] = useState(0);

    const imageUrls = useMemo(
        () =>
            listing.images.map(
                (image) => `${import.meta.env.BASE_URL}images/${image}`
            ),
        [listing.images]
    );

    const telegramUrl = useMemo(() => {
        const message = encodeURIComponent(
            `Hello! I would like to buy "${listing.name}". Is it still available?`
        );

        return `https://t.me/${listing.username}?text=${message}`;
    }, [listing.name, listing.username]);

    const previousImage = () =>
        setCurrentImage((prev) =>
            prev === 0 ? imageUrls.length - 1 : prev - 1
        );

    const nextImage = () =>
        setCurrentImage((prev) => (prev + 1) % imageUrls.length);

    return (
        <div className="overflow-hidden border border-gray-200 bg-white">
            {/* Carousel */}
            <div className="relative aspect-square bg-gray-100">
                <img
                    src={imageUrls[currentImage]}
                    alt={`${listing.name} ${currentImage + 1}`}
                    className="h-full w-full object-contain"
                />

                {imageUrls.length > 1 && (
                    <>
                        <button
                            onClick={previousImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
                        >
                            ←
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
                        >
                            →
                        </button>

                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                            {imageUrls.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`h-2 w-2 rounded-full transition ${index === currentImage
                                        ? "bg-white"
                                        : "bg-white/50 hover:bg-white/80"
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Content */}
            <div className="space-y-4 p-5">
                <div>
                    <h2 className="text-2xl font-bold">{listing.name}</h2>
                    <p className="text-gray-500">{listing.company}</p>
                </div>

                <p className="text-3xl font-bold text-green-600">{listing.price}</p>

                <p>
                    <span className="font-semibold">Состояние:</span>{" "}
                    {listing.condition}
                </p>

                <p className="text-gray-700">{listing.description}</p>

                <div className="flex flex-wrap gap-3">
                    <a
                        href={listing.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700 flex items-center gap-2"
                    >
                        Product Page
                    </a>

                    <a
                        href={telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" bg-sky-500 px-4 py-2 text-white transition hover:bg-sky-600 flex items-center gap-2"
                    >
                        <img
                            src={telegramLogo}
                            alt="Logo"
                            className="h-8 w-auto"
                        />
                        Contact on Telegram
                    </a>
                </div>
            </div>
        </div>
    );
}
