import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GuestbookEntry } from '../types';
import { HeartHandshake, Heart, Send } from 'lucide-react';

interface GuestbookSectionProps {
  initialEntries: GuestbookEntry[];
  coupleNames?: string;
  messagePlaceholder?: string;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  initialEntries,
  coupleNames,
  messagePlaceholder,
}) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: 'هم‌اکنون',
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
  };

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative w-full flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-[390px] sm:max-w-[420px]">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center mx-auto mb-2.5">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            دفترچه یادبود و آرزوهای نیک
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            پیام‌های محبت‌آمیز شما بهترین هدیه برای آغاز این سفر مشترک است
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-slate-900/80 rounded-[30px] p-5 border border-slate-700/60 shadow-xl mb-6">
          <form onSubmit={handleSubmit} className="space-y-3 text-right">
            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام شما..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
              />
            </div>
            <div>
              <textarea
                rows={2}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  messagePlaceholder ||
                  (coupleNames
                    ? `شادباش صمیمانه خود را برای ${coupleNames} بنویسید...`
                    : 'شادباش صمیمانه خود را بنویسید...')
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ثبت پیام تبریک</span>
            </button>
          </form>
        </div>

        {/* List of Messages */}
        <div className="space-y-3">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-[#243345]/90 border border-slate-700 text-right shadow-sm relative"
            >
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => toggleLike(entry.id)}
                  className={`p-1.5 rounded-full transition-colors ${
                    likedMap[entry.id]
                      ? 'text-rose-400 bg-rose-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${likedMap[entry.id] ? 'fill-rose-400' : ''}`}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">{entry.date}</span>
                  <span className="text-xs font-bold text-amber-300">
                    {entry.name}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed pl-6">
                {entry.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
