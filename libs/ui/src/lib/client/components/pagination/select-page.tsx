import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function SelectPage({ page, setPage, totalPage }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className=" drop-shadow-xl relative  min-w-[50px]"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="join-item relative w-full flex items-center justify-center px-3 h-8 text-sm font-medium btn btn-outline btn-sm"
      >
        {page}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute w-full bg-white flex flex-col max-h-[200px] overflow-auto select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: { duration: 0.5, ease: 'backOut' },
            }}
          >
            {[...Array(totalPage)].map((v, index) => {
              const _i = index + 1;
              return (
                <motion.li
                  className={clsx(
                    'cursor-default text-xs text-center hover:bg-primary/30 py-2 rounded-none',
                    {
                      'bg-primary/30': _i === page,
                    }
                  )}
                  key={index}
                  onClick={() => {
                    setPage(index + 1);
                    setIsOpen(false);
                  }}
                >
                  {index + 1}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
