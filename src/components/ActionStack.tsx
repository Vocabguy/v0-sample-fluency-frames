'use client';

import { motion } from 'framer-motion';
import { useSimulationStore } from '@/hooks/useSimulationStore';
import { FluencyRing } from './FluencyRing';

export function ActionStack() {
  const {
    currentThread,
    selectedWord,
    ringState,
    stageWord,
    sendWord,
    resetRing,
  } = useSimulationStore();

  // Get the current interactive message
  const currentMessage = currentThread?.messages.find(msg => msg.is_interactive);

  const handleWordSelect = (word: string) => {
    stageWord(word);
  };

  const handleSend = () => {
    if (selectedWord) {
      sendWord();
      // Reset after animation
      setTimeout(() => resetRing(), 2000);
    }
  };

  return (
    <div className="border-t border-[#E7E5E4] bg-white">
      {/* Layer 1: Frame Instruction Banner */}
      {currentMessage?.frame_goal && (
        <div className="px-4 md:px-6 py-2 bg-slate-50 border-b border-[#E7E5E4]">
          <p className="text-sm text-[#0C0A09] text-center">
            🎯 {currentMessage.frame_goal}
          </p>
        </div>
      )}

      {/* Layer 2: Input Row */}
      <div className="p-4 md:p-6 flex items-end gap-4">
        {/* Left side: Dialogue Box and Inline Options */}
        <div className="flex-1">
          {/* The Input Pill */}
          <div className="bg-white border border-[#E7E5E4] rounded-full px-4 md:px-6 py-3 mb-4 relative">
            <p className="text-[13px] md:text-[14px] text-[#0C0A09]">
              {currentMessage?.syntax?.prefix || 'I agree, but I'}{' '}
              <motion.button
                className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 rounded text-[12px] md:text-[13px] font-medium cursor-pointer hover:bg-green-200 transition-colors"
                onClick={() => {
                  // Could open a popover, but for now just show options inline
                }}
                animate={{
                  scale: ringState === 'staged' ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {selectedWord ? `[${selectedWord}]` : '[select word]'}
              </motion.button>
              {' '}{currentMessage?.syntax?.suffix || 'it too late.'}
            </p>
          </div>

          {/* Inline Word Options */}
          {currentMessage?.options && (
            <motion.div
              className="flex flex-wrap gap-2 md:gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentMessage.options.map((option, index) => (
                <motion.button
                  key={option.word}
                  className={`text-[12px] md:text-[13px] px-3 py-1 rounded-full border transition-all ${
                    selectedWord === option.word
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-white text-[#22C55E] border-[#E7E5E4] hover:bg-green-50'
                  }`}
                  onClick={() => handleWordSelect(option.word)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {option.word}: {option.definition.split(' ').slice(0, 3).join(' ')}...
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right side: Hero Avatar with Fluency Ring */}
        <div className="flex-shrink-0">
          <motion.button
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={handleSend}
            disabled={!selectedWord}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FluencyRing size={47} strokeWidth={2} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}