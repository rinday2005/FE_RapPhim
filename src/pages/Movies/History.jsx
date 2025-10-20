import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { resolveAssetUrl } from "../../api";

const History = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Đảm bảo Axios luôn gửi kèm token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  }, []);

  // ✅ Gọi API lấy danh sách vé
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Bạn cần đăng nhập để xem lịch sử vé");
          setLoading(false);
          return;
        }

        const res = await API.get("/bookings/user");
        const fetched = res.data?.bookings ?? [];

        setBookings(fetched);
      } catch (e) {
        const status = e.response?.status;
        if (status === 401 || status === 403) {
          setError("Unauthorized");
        } else {
          setError(e.response?.data?.message || "Không tải được lịch sử vé");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Format tiền VND
  const formatCurrency = (n) => (n || 0).toLocaleString("vi-VN") + "₫";

  // ✅ Hiển thị combo
  const renderCombos = (booking) => {
    const combos =
      booking.combos ||
      booking.selectedCombos ||
      (Array.isArray(booking.combos) ? booking.combos : {});

    if (Array.isArray(combos) && combos.length > 0) {
      return (
        <div className="flex flex-wrap gap-2">
          {combos.map((c, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-pink-500/20 border border-pink-400/40 rounded text-xs text-pink-200"
            >
              {c.name}: x{c.quantity || 1}
            </span>
          ))}
        </div>
      );
    }

    const entries = Object.entries(combos).filter(([, qty]) => qty > 0);
    if (entries.length === 0)
      return <span className="text-gray-400">Không chọn</span>;

    return (
      <div className="flex flex-wrap gap-2">
        {entries.map(([name, qty]) => (
          <span
            key={name}
            className="px-2 py-1 bg-pink-500/20 border border-pink-400/40 rounded text-xs text-pink-200"
          >
            {name}: x{qty}
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-white">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hiệu ứng nền */}
      <div className="meteors-container">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="meteor"
            style={{
              left: `${10 * (i + 1)}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
      <div className="animated-grid" />

      <div className="relative z-10 px-4 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-white hover:text-purple-300 transition-colors group"
            >
              <svg
                className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-medium">Về trang chủ</span>
            </button>
            <h1 className="text-3xl font-bold">Lịch sử vé của bạn</h1>
          </div>

          {/* Thông báo lỗi */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {/* Nếu chưa đăng nhập */}
          {error === "Unauthorized" ? (
            <div className="text-center space-y-3">
              <div className="text-gray-300">
                Bạn cần đăng nhập để xem lịch sử vé.
              </div>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
              >
                Đăng nhập
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center text-gray-300">
              Chưa có vé nào được đặt
            </div>
          ) : (
            <div className="space-y-5">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5"
                >
                  <div className="flex gap-4">
                    <img
                      src={resolveAssetUrl(b.moviePoster)}
                      alt={b.movieTitle}
                      className="w-24 h-36 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-semibold">
                            {b.movieTitle || "Phim không xác định"}
                          </h2>
                          <div className="text-gray-300 text-sm">
                            {b.date} • {b.startTime} - {b.endTime}
                          </div>
                          <div className="text-gray-300 text-sm">
                            {b.systemName} • {b.clusterName} • Phòng{" "}
                            {b.hallName}
                          </div>

                          {/* Ghế */}
                          <div className="mt-2">
                            <div className="text-sm text-gray-300 mb-1">
                              Ghế:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(b.seats || []).map((s, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-purple-500/30 border border-purple-400 rounded text-xs text-white"
                                >
                                  {s.seatNumber || s}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Combo */}
                          <div className="mt-3">
                            <div className="text-sm text-gray-300 mb-1">
                              Combo:
                            </div>
                            {renderCombos(b)}
                          </div>
                        </div>

                        {/* Tổng tiền */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-yellow-400">
                            {formatCurrency(b.total || b.totalPrice)}
                          </div>
                          {b.paymentMethod && (
                            <div className="text-xs text-gray-300 mt-1">
                              Thanh toán:{" "}
                              {b.paymentMethod.toUpperCase?.() || "MOMO"}
                            </div>
                          )}
                          {b.bookingCode && (
                            <div className="mt-2 text-xs px-2 py-1 rounded bg-white/10 border border-white/20">
                              Mã vé: {b.bookingCode}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
