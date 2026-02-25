const MainSection = () => {
    return (
        <section className="min-h-screen bg-gray-50 py-16 px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                    Daftar Produk
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Product Card A */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                        <div className="h-56 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">A</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Produk A</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Laptop gaming dengan performa tinggi dan desain premium untuk gaming experience terbaik.
                            </p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <span className="text-3xl font-bold text-blue-600">Rp 15.000.000</span>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
                                    Beli Sekarang
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Card B */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                        <div className="h-56 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">B</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Produk B</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Smartphone flagship dengan kamera profesional dan baterai tahan lama sepanjang hari.
                            </p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <span className="text-3xl font-bold text-blue-600">Rp 8.500.000</span>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
                                    Beli Sekarang
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Card C */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                        <div className="h-56 bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">C</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Produk C</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Headphone wireless dengan noise cancelling aktif dan kualitas audio studio grade.
                            </p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <span className="text-3xl font-bold text-blue-600">Rp 2.500.000</span>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
                                    Beli Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainSection;
