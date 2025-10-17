import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api";

const BookingsList = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, confirmed, pending, cancelled

  useEffect(() => {
    loadBookings();
  }, [filter]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/bookings", {
        params: { status: filter === "all" ? undefined : filter }
      });
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-500/20 border-green-500/50 text-green-300";
      case "pending": return "bg-yellow-500/20 border-yellow-500/50 text-yellow-300";
      case "cancelled": return "bg-red-500/20 border-red-500/50 text-red-300";
      default: return "bg-gray-500/20 border-gray-500/50 text-gray-300";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed": return "Đã xác nhận";
      case "pending": return "Chờ xử lý";
      case "cancelled": return "Đã hủy";
      default: return "Không xác định";
    }
  };

  if (loading) {
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
      <div className="relative z-10 p-4 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎫 Quản lý đặt vé
            </h1>
            <p className="text-gray-400 mt-1">
              Xem và quản lý tất cả vé đã đặt
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === "all" 
                  ? "bg-purple-500 text-white" 
                  : "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter("confirmed")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === "confirmed" 
                  ? "bg-green-500 text-white" 
                  : "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
              }`}
            >
              Đã xác nhận
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === "pending" 
                  ? "bg-yellow-500 text-white" 
                  : "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
              }`}
            >
              Chờ xử lý
            </button>
            <button
              onClick={() => setFilter("cancelled")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === "cancelled" 
                  ? "bg-red-500 text-white" 
                  : "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
              }`}
            >
              Đã hủy
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="text-left px-6 py-4 text-white font-semibold">Mã vé</th>
                  <th className="text-left px-6 py-4 text-white font-semibold">Phim</th>
                  <th className="text-left px-6 py-4 text-white font-semibold">Rạp</th>
                  <th className="text-left px-6 py-4 text-white font-semibold">Ngày chiếu</th>
                  <th className="text-left px-6 py-4 text-white font-semibold">Ghế</th>
                  <th className="text-left px-6 py-4 text-white font-semibold">Tổng tiền</th>
                  <th className="text-left px-6 py-4 text-white font-semibold">Trạng thái</th>
                  <th className="text-left px-6 py-4 text-white font-semibold">Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-gray-400">
                      Không có vé nào
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm bg-white/10 px-2 py-1 rounded">
                          {booking.bookingId || booking._id.slice(-8)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={booking.moviePoster} 
                            alt={booking.movieTitle}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div>
                            <div className="font-semibold text-white">{booking.movieTitle}</div>
                            <div className="text-sm text-gray-400">{booking.startTime} - {booking.endTime}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-white">{booking.systemName}</div>
                          <div className="text-sm text-gray-400">{booking.clusterName}</div>
                          <div className="text-sm text-gray-400">Phòng {booking.hallName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white">
                        {new Date(booking.date).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {booking.seats?.map((seat, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-purple-500/30 border border-purple-400 rounded text-xs text-white"
                            >
                              {seat.seatNumber}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-yellow-400">
                          {booking.total?.toLocaleString()}₫
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(booking.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white">{bookings.length}</div>
            <div className="text-gray-400">Tổng vé</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-green-400">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-gray-400">Đã xác nhận</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-yellow-400">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
            <div className="text-gray-400">Chờ xử lý</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-red-400">
              {bookings.filter(b => b.status === 'cancelled').length}
            </div>
            <div className="text-gray-400">Đã hủy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsList;


