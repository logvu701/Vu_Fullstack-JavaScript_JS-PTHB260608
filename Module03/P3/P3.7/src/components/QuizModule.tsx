import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, Play, Pause, RotateCcw, Award, ArrowRight, Plus } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Trong React, để khắc phục triệt để vấn đề Prop Drilling ở các state toàn cục, giải pháp nào sau đây là phù hợp nhất?',
    options: ['Sử dụng Context API kết hợp useContext', 'Truyền callback qua 10 cấp props', 'Lưu state vào biến toàn cục window.state', 'Sử dụng jQuery selector'],
    correct: 0,
  },
  {
    id: 2,
    text: 'Khi hook useCountdown bị unmount trong lúc timer đang chạy, việc cleanup clearInterval trong useEffect có vai trò gì?',
    options: ['Tăng tốc độ CPU', 'Ngăn ngừa rò rỉ bộ nhớ (Memory Leak) và lỗi update state trên component đã huỷ', 'Tự động reload trang', 'Không có tác dụng gì'],
    correct: 1,
  },
  {
    id: 3,
    text: 'Để TypeScript hiểu giá trị trả về của Custom Hook là một Tuple chính xác kiểu dữ liệu từng phần tử, ta dùng cú pháp nào?',
    options: ['as string', 'as any', 'as const (Const Assertion)', 'as unknown'],
    correct: 2,
  },
  {
    id: 4,
    text: 'Trong bài toán URL state, khi người dùng xóa sạch ô tìm kiếm, cách xử lý chuẩn là:',
    options: ['setSearchParams({ q: "" })', 'params.delete("q") để xóa hoàn toàn param khỏi URL', 'setSearchParams({ q: "undefined" })', 'Gán URL về null'],
    correct: 1,
  },
];

export const QuizModule: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hook useCountdown điều khiển thời gian làm bài 60 giây
  const {
    timeLeft,
    isRunning,
    isExpired,
    formattedTime,
    progressPercent,
    start,
    pause,
    reset,
    addSeconds,
  } = useCountdown({
    initialSeconds: 60,
    autoStart: true,
    onExpire: () => {
      // BẪY DỮ LIỆU: Tự động ngắt và nộp bài khi chạm mốc 0
      setIsSubmitted(true);
    },
  });

  const handleSelectAnswer = (questionId: number, optionIdx: number) => {
    if (isSubmitted || isExpired) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleManualSubmit = () => {
    pause();
    setIsSubmitted(true);
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    reset(60);
    start();
  };

  // Tính điểm
  const score = Object.entries(userAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q && q.correct === ansIdx ? acc + 1 : acc;
  }, 0);

  const isTimeCritical = timeLeft > 0 && timeLeft <= 15;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Timer Bar Box */}
      <div className={`p-6 rounded-3xl border backdrop-blur-md transition-all duration-300 shadow-xl ${
        isExpired
          ? 'bg-rose-950/40 border-rose-800'
          : isTimeCritical
          ? 'bg-amber-950/40 border-amber-500 animate-pulse'
          : 'bg-slate-800/80 border-slate-700'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Timer Display */}
          <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-2xl ${
              isExpired
                ? 'bg-rose-500/20 text-rose-400'
                : isTimeCritical
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-indigo-500/20 text-indigo-400'
            }`}>
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Thời gian còn lại:</div>
              <div className={`text-3xl font-black font-mono tracking-tight ${
                isExpired
                  ? 'text-rose-400'
                  : isTimeCritical
                  ? 'text-amber-400'
                  : 'text-white'
              }`}>
                {formattedTime}
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {!isSubmitted && !isExpired && (
              <>
                <button
                  onClick={isRunning ? pause : start}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    isRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRunning ? 'Tạm dừng' : 'Tiếp tục'}</span>
                </button>

                <button
                  onClick={() => addSeconds(15)}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-slate-200 transition flex items-center gap-1"
                  title="Cộng thêm 15 giây"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+15s</span>
                </button>
              </>
            )}

            <button
              onClick={handleRestartQuiz}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-slate-200 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại từ đầu</span>
            </button>

            {!isSubmitted && !isExpired && (
              <button
                onClick={handleManualSubmit}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow"
              >
                Nộp bài ngay
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isExpired
                ? 'bg-rose-500'
                : isTimeCritical
                ? 'bg-amber-500'
                : 'bg-indigo-500'
            }`}
            style={{ width: `${100 - progressPercent}%` }}
          />
        </div>

        {/* Critical Alert */}
        {isTimeCritical && !isExpired && (
          <div className="mt-3 flex items-center gap-2 text-xs text-amber-300 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Cảnh báo: Sắp hết thời gian! Hãy nhanh chóng hoàn thành các câu hỏi còn lại.</span>
          </div>
        )}

        {isExpired && (
          <div className="mt-3 flex items-center gap-2 text-xs text-rose-300 font-medium">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Hết giờ! Hệ thống đã tự động khóa bài thi và tổng hợp kết quả (Auto-expire).</span>
          </div>
        )}
      </div>

      {/* Result Card if submitted */}
      {isSubmitted && (
        <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-700/50 rounded-3xl shadow-xl space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Kết quả Bài thi Trắc nghiệm</h3>
              <p className="text-xs text-slate-300">
                Bạn đã trả lời đúng <strong>{score} / {QUIZ_QUESTIONS.length}</strong> câu ({((score / QUIZ_QUESTIONS.length) * 100).toFixed(0)}%)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Question List */}
      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selectedOption = userAnswers[q.id];
          return (
            <div
              key={q.id}
              className="p-6 bg-slate-800/70 border border-slate-700/80 rounded-3xl space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Câu {idx + 1}
                </span>
                <span className="text-xs text-slate-400">1 điểm</span>
              </div>

              <h4 className="text-sm font-semibold text-white leading-relaxed">
                {q.text}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = q.correct === optIdx;

                  let btnStyle = 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700/50';

                  if (isSelected) {
                    btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-medium';
                  }

                  if (isSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted || isExpired}
                      onClick={() => handleSelectAnswer(q.id, optIdx)}
                      className={`p-3.5 rounded-2xl border text-xs text-left transition-all flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
