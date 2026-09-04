import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, MessageSquare, Send, Users, ShieldCheck, Code, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const VirtualClassroomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuth();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [messages, setMessages] = useState([
    { user: 'Thầy Hoàng Nam', text: 'Chào mừng các bạn đến với buổi Live Coding kiến trúc Protected Routes!', time: '19:00' },
    { user: 'Nguyễn Văn Học Viên', text: 'Em đã vào được phòng học an toàn ạ!', time: '19:01' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !user) return;
    setMessages((prev) => [
      ...prev,
      { user: user.name, text: chatInput.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setChatInput('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Room Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-800/80 border border-slate-700 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Phòng Học Trực Tuyến: #{roomId}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE STREAM
              </span>
            </div>
            <p className="text-xs text-slate-400">Nội dung bảo mật cao cấp dành riêng cho học viên đã xác thực</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Xác thực: <strong>{user?.name}</strong></span>
          </span>
        </div>
      </div>

      {/* Main Classroom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stream & Code Mockup on Left */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-xs font-semibold text-white">
                Chuyên đề: React Router v6 & Protected Routes
              </span>
              <span className="px-3 py-1 rounded-xl bg-purple-600/80 text-xs font-bold text-white shadow">
                1080p 60fps
              </span>
            </div>

            {/* Video Mock Center */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center mx-auto animate-pulse">
                <Play className="w-8 h-8 fill-purple-400" />
              </div>
              <div className="text-sm font-semibold text-white">Đang phát trực tiếp bài giảng...</div>
            </div>

            {/* Controls bottom */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-2xl transition ${
                  isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 text-white'
                }`}
                title="Bật/Tắt Micro"
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-2xl transition ${
                  isVideoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 text-white'
                }`}
                title="Bật/Tắt Camera"
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Chat on Right */}
        <div className="lg:col-span-4 bg-slate-800/80 border border-slate-700 rounded-3xl p-5 space-y-4 flex flex-col h-[420px]">
          <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-700">
            <span className="font-bold flex items-center gap-1.5 text-white">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              Hỏi đáp Trực tiếp
            </span>
            <span>{messages.length} tin nhắn</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-purple-400">{m.user}</span>
                  <span className="text-slate-500">{m.time}</span>
                </div>
                <p className="text-slate-200">{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Gửi câu hỏi cho giảng viên..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
