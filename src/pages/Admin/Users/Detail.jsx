import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../../api';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get('/users');
        const all = res.data?.users || [];
        const found = all.find((u) => (u._id || u.id) === id);
        if (!found) throw new Error('Không tìm thấy người dùng');
        setUser(found);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const [form, setForm] = useState({ fullName: '', phone: '', role: 'user' });
  useEffect(() => {
    if (user) setForm({ fullName: user.fullName || '', phone: user.phone || '', role: user.role || 'user' });
  }, [user]);

  const onChange = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }));

  const onSave = async () => {
    try {
      // profile update
      await API.put('/users/me', { fullName: form.fullName, phone: form.phone });
      // role update (admin only)
      if (user.role !== form.role) await API.put(`/users/${id}/role`, { role: form.role });
      alert('Cập nhật thành công');
      navigate('/admin/users');
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Cập nhật thất bại');
    }
  };

  const onDelete = async () => {
    if (!window.confirm('Xóa tài khoản này?')) return;
    try {
      await API.delete(`/users/${id}`);
      alert('Đã xóa');
      navigate('/admin/users');
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Xóa thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Thông tin người dùng</h1>
          <button onClick={() => navigate('/admin/users')} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20">Về danh sách</button>
        </div>
        {loading ? (
          <div className="text-white">Đang tải...</div>
        ) : error ? (
          <div className="text-red-300">{error}</div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Họ tên</label>
              <input value={form.fullName} onChange={onChange('fullName')} className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input value={user.email} disabled className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-400" />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Số điện thoại</label>
              <input value={form.phone} onChange={onChange('phone')} className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Role</label>
              <select value={form.role} onChange={onChange('role')} className="w-full px-4 py-2 rounded-xl bg-white text-black border border-gray-300 focus:outline-none">
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="superadmin">superadmin</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={onDelete} className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30">Xóa</button>
              <button onClick={onSave} className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/50 text-blue-300 hover:bg-blue-500/30">Lưu</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;


