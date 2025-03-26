import { cva } from 'class-variance-authority';
import React from 'react';
import { SiPolestar } from 'react-icons/si';

const threadCard = cva(
  'flex-start flex w-fit gap-x-5 rounded-lg p-5 dark:bg-[#0d0d0d] dark:text-white',
  {
    variants: {
      variant: {
        question: 'bg-gray-200 dark:bg-[#5f5f5f] dark:text-white',
        answer: 'border border-gray-300 bg-white dark:text-white',
      },
    },
    defaultVariants: {
      variant: 'question',
    },
  },
);

type ThreadCardProps = {
  variant?: 'question' | 'answer';
  questionLabel?: string;
  children: React.ReactNode;
  loading: boolean;
};

export const ThreadCard = ({
  variant = 'question',
  questionLabel,
  children,
  loading,
}: ThreadCardProps) => {
  if (loading) {
    return <SiPolestar className="animate-spin" size={30} />;
  }
  return (
    <div className={threadCard({ variant })}>
      {variant === 'question' && (
        <p className="flex aspect-square size-8 items-center justify-center rounded-full bg-gray-400 ">
          {questionLabel || 'Q'}
        </p>
      )}
      <p>{children}</p>
    </div>
  );
};
