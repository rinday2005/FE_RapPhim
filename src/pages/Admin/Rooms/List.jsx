import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api";

const RoomsList = () => {
  const navigate = useNavigate();
  const [cinemas, setCinemas] = useState([]);
  const [cinemaId, setCinemaId] = useState("");
  const [rooms, setRooms] = useState([]);

  const loadCinemas = async () => {
    const res = await API.get("/cinemas");
    setCinemas(res.data.cinemas || []);
  };
  const loadRooms = async () => {
    const res = await API.get(`/rooms`, { params: cinemaId ? { cinemaId } : {} });
    setRooms(res.data.rooms || []);
  };

  useEffect(() => { loadCinemas(); }, []);
  useEffect(() => { loadRooms(); }, [cinemaId]);

  const del = async (id) => {
    if (!window.confirm("Xóa phòng này?")) return;
    await API.delete(`/rooms/${id}`);
    loadRooms();
  };

  return (
    <div className="p-4 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Phòng chiếu</h1>
        <button onClick={() => navigate("add")} className="px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 hover:bg-green-500/30">+ Thêm phòng</button>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-1">Cụm rạp</label>
        <select value={cinemaId} onChange={(e)=>setCinemaId(e.target.value)} className="px-3 py-2 rounded bg-white text-black">
          <option value="">Tất cả</option>
          {cinemas.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <thead className="bg-white/10">
            <tr>
              <th className="text-left px-4 py-3">Tên</th>
              <th className="text-left px-4 py-3">Sức chứa</th>
              <th className="text-left px-4 py-3">Loại phòng</th>
              <th className="text-left px-4 py-3">Cụm rạp</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r._id} className="border-t border-white/10">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.capacity}</td>
                <td className="px-4 py-3">{r.type}</td>
                <td className="px-4 py-3">{cinemas.find(c=>c._id===r.cinemaId)?.name || r.cinemaId}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => navigate(`${r._id}/edit`)} className="mr-2 px-3 py-1 rounded bg-blue-500/20 border border-blue-500/50">Sửa</button>
                  <button onClick={() => del(r._id)} className="px-3 py-1 rounded bg-red-500/20 border border-red-500/50">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsList;




