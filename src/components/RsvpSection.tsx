import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, UserCheck, Users, MessageSquare, Send, Heart } from 'lucide-react';

interface RsvpSectionProps {
  onSuccess?: (name: string, message: string) => void;
  coupleNames?: string;
  notePlaceholder?: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  onSuccess,
  coupleNames,
  notePlaceholder,
}) => {
  const [name, setName] = useState('');
  const [guestsCount, setGuestsCount] = useState('1');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitted(true);
    if (onSuccess && note.trim()) {
      onSuccess(name.trim(), note.trim());
    }
  };

  return (
    <section id="rsvp-section" className="relative w-full flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-[390px] sm:max-w-[420px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1e2837] rounded-[34px] p-6 sm:p-7 border border-slate-700/60 shadow-2xl text-white relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-300 flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white">
              اعلام و تأیید حضور (RSVP)
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              خواهشمندیم با ثبت اطلاعات خود، ما را در هماهنگی هرچه باشکوه‌تر جشن یاری فرمایید
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-right">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    نام و نام خانوادگی گرامی:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: سهراب سپهری"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                {/* Attendance Status Radios */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    وضعیت همراهی شما در جشن:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAttendance('attending')}
                      className={`p-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                        attendance === 'attending'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>با افتخار حضور دارم</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('not_attending')}
                      className={`p-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                        attendance === 'not_attending'
                          ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-md'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <span>امکان حضور ندارم</span>
                    </button>
                  </div>
                </div>

                {/* Number of Guests (Only if attending) */}
                {attendance === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>تعداد کل نفرات (همراه خودتان):</span>
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="1">۱ نفر (تنها)</option>
                      <option value="2">۲ نفر (همراه همسر / همراه)</option>
                      <option value="3">۳ نفر (خانوادگی)</option>
                      <option value="4">۴ نفر و بیشتر</option>
                    </select>
                  </motion.div>
                )}

                {/* Optional note or wishes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>پیام تبریک یا یادداشت دلخواه:</span>
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={
                      notePlaceholder ||
                      (coupleNames
                        ? `تبریک صمیمانه به ${coupleNames}...`
                        : 'تبریک صمیمانه به عروس و داماد...')
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-extrabold text-sm shadow-lg shadow-amber-400/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>ثبت و ارسال پاسخ</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/40 animate-bounce">
                  <Heart className="w-8 h-8 fill-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  پاسخ شما با مهر ثبت گردید!
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed px-4">
                  {name} عزیز، از اینکه با پیام و همراهی خود شادی این پیوند را دوچندان نمودید، صمیمانه سپاسگزاریم.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs text-amber-300 underline font-medium hover:text-amber-200"
                >
                  ویرایش مجدد اطلاعات
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
