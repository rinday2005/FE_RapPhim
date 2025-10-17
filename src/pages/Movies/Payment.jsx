import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import QRCode from "qrcode";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [loading, setLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");

  useEffect(() => {
    // Lấy booking data từ sessionStorage
    const data = sessionStorage.getItem('bookingData');
    if (!data) {
      toast.error("Không tìm thấy thông tin đặt vé");
      navigate('/');
      return;
    }
    
    try {
      setBookingData(JSON.parse(data));
    } catch (err) {
      toast.error("Dữ liệu đặt vé không hợp lệ");
      navigate('/');
    }
  }, [navigate]);

  const generateMoMoQR = async (amount) => {
    try {
      // Tạo QR code cho MoMo với thông tin thanh toán
      const momoData = {
        amount: amount,
        description: `Thanh toán vé xem phim - ${bookingData.movieTitle}`,
        orderId: `MOMO_${Date.now()}`,
        merchantName: "Rạp Chiếu Phim",
        merchantCode: "RAPPHIM001"
      };
      
      const qrString = `momo://transfer?amount=${amount}&note=${encodeURIComponent(momoData.description)}&orderId=${momoData.orderId}`;
      const qrDataURL = await QRCode.toDataURL(qrString, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeDataURL(qrDataURL);
      setShowQRCode(true);
    } catch (err) {
      console.error('Error generating QR code:', err);
      toast.error("Không thể tạo mã QR");
    }
  };

  const handlePayment = async () => {
    if (!bookingData) return;
    
    if (paymentMethod === "momo") {
      // Hiển thị QR code MoMo
      await generateMoMoQR(bookingData.total);
      return;
    }
    
    setLoading(true);
    try {
      // TODO: Tích hợp payment gateway cho VNPay và Visa
      // Tạm thời simulate payment success
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Confirm booking và unlock seats
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      
      await axios.post(
        "http://localhost:5000/api/seat-locks/confirm",
        {
          lockId: bookingData.lockId,
          userId: user._id,
          bookingData: {
            userEmail: user.email,
            movieTitle: bookingData.movieTitle,
            moviePoster: bookingData.moviePoster,
            systemName: bookingData.systemName,
            clusterName: bookingData.clusterName,
            hallName: bookingData.hallName,
            date: bookingData.date,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
            selectedSeats: bookingData.selectedSeats,
            selectedCombos: bookingData.selectedCombos,
            total: bookingData.total,
            paymentMethod
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Sau khi confirm thành công, điều hướng đến trang lịch sử
      navigate('/profile', { state: { tab: 'bookings' } });
    } catch (err) {
      toast.error("Thanh toán thất bại, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleMoMoPaymentSuccess = async () => {
    // Khi user xác nhận đã thanh toán MoMo thành công
    if (!bookingData) return;
    setLoading(true);
    
    try {
      // Confirm booking và unlock seats
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      
      await axios.post(
        "http://localhost:5000/api/seat-locks/confirm",
        {
          lockId: bookingData.lockId,
          userId: user._id,
          bookingData: {
            movieTitle: bookingData.movieTitle,
            selectedSeats: bookingData.selectedSeats,
            total: bookingData.total,
            paymentMethod: "momo"
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Simulate payment success
      setTimeout(() => {
        sessionStorage.setItem('paymentData', JSON.stringify({
          ...bookingData,
          paymentMethod: "momo",
          paymentStatus: 'success',
          transactionId: `MOMO_${Date.now()}`
        }));
        // Đóng QR sau khi đã xử lý xong để không bị hiểu nhầm là không bấm được
        setShowQRCode(false);
        navigate('/confirm-ticket');
      }, 1000);
    } catch (err) {
      console.error("Confirm booking error:", err);
      toast.error("Có lỗi xảy ra khi xác nhận đặt vé");
      setLoading(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="meteors-container">
        <div className="meteor" style={{ left: "10%", animationDelay: "0s", animationDuration: "3s" }}></div>
        <div className="meteor" style={{ left: "20%", animationDelay: "1s", animationDuration: "4s" }}></div>
        <div className="meteor" style={{ left: "30%", animationDelay: "2s", animationDuration: "3.5s" }}></div>
        <div className="meteor" style={{ left: "40%", animationDelay: "0.5s", animationDuration: "4.5s" }}></div>
        <div className="meteor" style={{ left: "50%", animationDelay: "1.5s", animationDuration: "3.2s" }}></div>
        <div className="meteor" style={{ left: "60%", animationDelay: "2.5s", animationDuration: "4.2s" }}></div>
        <div className="meteor" style={{ left: "70%", animationDelay: "0.8s", animationDuration: "3.8s" }}></div>
        <div className="meteor" style={{ left: "80%", animationDelay: "1.8s", animationDuration: "4.1s" }}></div>
        <div className="meteor" style={{ left: "90%", animationDelay: "2.8s", animationDuration: "3.6s" }}></div>
      </div>
      <div className="animated-grid"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            💳 Thanh toán
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Thông tin đặt vé</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={bookingData.moviePoster} 
                    alt={bookingData.movieTitle}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{bookingData.movieTitle}</h3>
                    <p className="text-gray-300">{bookingData.date} • {bookingData.startTime} - {bookingData.endTime}</p>
                    <p className="text-gray-300">{bookingData.systemName} • {bookingData.clusterName}</p>
                    <p className="text-gray-300">Phòng {bookingData.hallName}</p>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Ghế đã chọn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bookingData.selectedSeats.map((seat, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-purple-500/30 border border-purple-400 rounded-lg text-white text-sm"
                      >
                        {seat.seatNumber} ({seat.type.toUpperCase()})
                      </span>
                    ))}
                  </div>
                </div>

                {Object.entries(bookingData.selectedCombos).some(([_, qty]) => qty > 0) && (
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Combo đã chọn:</h4>
                    <div className="space-y-2">
                      {Object.entries(bookingData.selectedCombos).map(([comboId, qty]) => {
                        if (qty === 0) return null;
                        return (
                          <div key={comboId} className="flex justify-between text-white">
                            <span>Combo {comboId}</span>
                            <span>x{qty}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">Tổng cộng:</span>
                    <span className="text-3xl font-bold text-yellow-400">
                      {bookingData.total.toLocaleString()}₫
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Phương thức thanh toán</h2>
              
              <div className="space-y-4">
                {/* Momo */}
                <label className="flex items-center p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-pink-500"
                  />
                  <div className="ml-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Ví MoMo</h3>
                      <p className="text-gray-400 text-sm">Thanh toán qua ví điện tử MoMo</p>
                    </div>
                  </div>
                </label>

                {/* VNPay */}
                <label className="flex items-center p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="vnpay"
                    checked={paymentMethod === "vnpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-blue-500"
                  />
                  <div className="ml-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">V</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">VNPay</h3>
                      <p className="text-gray-400 text-sm">Thanh toán qua cổng VNPay</p>
                    </div>
                  </div>
                </label>

                {/* Visa */}
                <label className="flex items-center p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="visa"
                    checked={paymentMethod === "visa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">V</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Thẻ Visa/Mastercard</h3>
                      <p className="text-gray-400 text-sm">Thanh toán qua thẻ quốc tế</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="mt-8 space-y-4">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-4 rounded-xl font-bold text-white text-lg disabled:opacity-50 transition-all duration-200 hover:scale-105"
                >
                  {loading ? "Đang xử lý..." : `Thanh toán ${bookingData.total.toLocaleString()}₫`}
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-gray-600 hover:bg-gray-500 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all duration-200"
                >
                  ← Quay lại
                </button>
              </div>
            </div>

            {/* MoMo QR Code Modal */}
            {showQRCode && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 max-w-md w-full mx-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">💳 Thanh toán MoMo</h3>
                    
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">
                        {bookingData.total.toLocaleString()}₫
                      </div>
                      <p className="text-gray-300 text-sm">
                        Quét mã QR bằng ứng dụng MoMo để thanh toán
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl mb-6 inline-block">
                      {qrCodeDataURL && (
                        <img 
                          src={qrCodeDataURL} 
                          alt="MoMo QR Code" 
                          className="w-64 h-64 mx-auto"
                        />
                      )}
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={handleMoMoPaymentSuccess}
                        className="w-full bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200"
                      >
                        ✅ Đã thanh toán thành công
                      </button>
                      
                      <button
                        onClick={() => setShowQRCode(false)}
                        className="w-full bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200"
                      >
                        ❌ Hủy thanh toán
                      </button>
                    </div>

                    <p className="text-gray-400 text-xs mt-4">
                      Mở ứng dụng MoMo và quét mã QR để thanh toán
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
