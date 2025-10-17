import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../api';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '', role: '', avatar: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ưu tiên hiển thị dữ liệu localStorage giống Home để không bị trống UI
    const localUser = localStorage.getItem('user');
    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        setProfile({
          fullName: parsed.fullName || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          role: parsed.role || '',
          avatar: parsed.avatar || '',
        });
        setLoading(false);
      } catch (_) {
        // ignore parse error
      }
    }

    // Sau đó gọi API để đồng bộ dữ liệu mới nhất
    (async () => {
      try {
        const res = await API.get('/users/me');
        setProfile(res.data.user);
        // đồng bộ lại localStorage như Home sử dụng
        localStorage.setItem('user', JSON.stringify(res.data.user));
      } catch (e) {
        if (!localUser) setLoading(false);
        setError(e.response?.data?.message || 'Không tải được hồ sơ');
      } finally {
        if (!localUser) setLoading(false);
      }
    })();
  }, []);

  // Nếu navigate tới với state { tab: 'bookings' } thì tự mở tab lịch sử
  useEffect(() => {
    if (location.state?.tab === 'bookings') {
      setActiveTab('bookings');
      if (bookings.length === 0) loadBookings();
    }
  }, [location.state]);

  const goToEdit = () => navigate('/profile/edit');

  const loadBookings = async () => {
    try {
      setBookingsLoading(true);
      const res = await API.get('/bookings/user');
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error('Error loading bookings:', err);
    } finally {
      setBookingsLoading(false);
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Đang tải...</div>;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Effects */}
      <div className="meteors-container">
        <div className="meteor" style={{ left: '10%', animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="meteor" style={{ left: '20%', animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="meteor" style={{ left: '30%', animationDelay: '2s', animationDuration: '3.5s' }}></div>
        <div className="meteor" style={{ left: '40%', animationDelay: '0.5s', animationDuration: '4.5s' }}></div>
        <div className="meteor" style={{ left: '50%', animationDelay: '1.5s', animationDuration: '3.2s' }}></div>
        <div className="meteor" style={{ left: '60%', animationDelay: '2.5s', animationDuration: '4.2s' }}></div>
        <div className="meteor" style={{ left: '70%', animationDelay: '0.8s', animationDuration: '3.8s' }}></div>
        <div className="meteor" style={{ left: '80%', animationDelay: '1.8s', animationDuration: '4.1s' }}></div>
        <div className="meteor" style={{ left: '90%', animationDelay: '2.8s', animationDuration: '3.6s' }}></div>
      </div>
      <div className="animated-grid"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white hover:text-purple-300 transition-colors group"
            >
              <svg className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Về trang chủ</span>
            </button>
          </div>
          
          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'profile'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Thông tin cá nhân
              </button>
              <button
                onClick={() => {
                  setActiveTab('bookings');
                  if (bookings.length === 0) loadBookings();
                }}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'bookings'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Lịch sử đặt vé
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin hồ sơ</h2>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-white/30">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'U')}&background=8B5CF6&color=fff`} alt="avatar" className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <div className="text-2xl font-semibold">{profile.fullName}</div>
                  <div className="text-gray-300">{profile.email}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-sm text-gray-400">Số điện thoại</p>
                  <p className="font-medium">{profile.phone || 'Chưa cập nhật'}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-sm text-gray-400">Quyền</p>
                  <p className="font-medium capitalize">{profile.role}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-sm text-gray-400">Gmail</p>
                  <p className="font-medium break-all">{profile.email}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-sm text-gray-400">Họ và tên</p>
                  <p className="font-medium">{profile.fullName}</p>
                </div>
              </div>
              <div className="mt-6">
                <button onClick={goToEdit} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600">Update</button>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Lịch sử đặt vé</h2>
              
              {bookingsLoading ? (
                <div className="text-center py-8">
                  <div className="text-gray-300">Đang tải...</div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-300">Chưa có vé nào được đặt</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={booking.moviePoster} 
                            alt={booking.movieTitle}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-semibold text-white">{booking.movieTitle}</h3>
                            <p className="text-sm text-gray-400">{booking.date} • {booking.startTime} - {booking.endTime}</p>
                            <p className="text-sm text-gray-400">{booking.systemName} • {booking.clusterName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-yellow-400">
                            {booking.total?.toLocaleString()}₫
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
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
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => {
                              // TODO: Navigate to payment
                              console.log('Navigate to payment for booking:', booking._id);
                            }}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm font-medium transition-colors"
                          >
                            Thanh toán
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Thông báo */}
          {error && (
            <div className="mt-6">
              <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200">
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
