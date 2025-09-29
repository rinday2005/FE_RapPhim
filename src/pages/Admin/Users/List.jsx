import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../api';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get('/users');
      setUsers(res.data?.users || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Quản lý người dùng</h1>
          <button onClick={() => navigate('/admin')} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20">Về Dashboard</button>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
          {loading ? (
            <div className="text-white">Đang tải...</div>
          ) : error ? (
            <div className="text-red-300">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-300">
                    <th className="py-3 px-2">Họ tên</th>
                    <th className="py-3 px-2">Email</th>
                    <th className="py-3 px-2">SĐT</th>
                    <th className="py-3 px-2">Role</th>
                    <th className="py-3 px-2">Ngày tạo</th>
                    <th className="py-3 px-2 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id || u.id} className="border-t border-white/10 text-white">
                      <td className="py-3 px-2">{u.fullName}</td>
                      <td className="py-3 px-2">{u.email}</td>
                      <td className="py-3 px-2">{u.phone}</td>
                      <td className="py-3 px-2">
                        <span className="inline-block px-2 py-1 rounded bg-white/10 border border-white/20 text-white text-xs uppercase">{u.role}</span>
                      </td>
                      <td className="py-3 px-2">{u.createdAt ? new Date(u.createdAt).toLocaleString('vi-VN') : '-'}</td>
                      <td className="py-3 px-2 text-right">
                        <button className="px-3 py-1 text-xs rounded bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 mr-2" onClick={() => navigate(`/admin/users/${u._id || u.id}`)}>Xem</button>
                        <button
                          className="px-3 py-1 text-xs rounded bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30"
                          onClick={async () => {
                            if (!window.confirm('Bạn có chắc muốn xóa tài khoản này?')) return;
                            try {
                              await API.delete(`/users/${u._id || u.id}`);
                              setUsers((prev) => prev.filter((x) => (x._id || x.id) !== (u._id || u.id)));
                            } catch (err) {
                              alert(err?.response?.data?.message || err.message || 'Xóa thất bại');
                            }
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;

