const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                    Produk Kami
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                    Temukan produk terbaik untuk kebutuhanmu.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                        Lihat Produk
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                        Hubungi Kami
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
