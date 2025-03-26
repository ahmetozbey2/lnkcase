'use client';

import { useParams } from 'next/navigation';
import * as React from 'react';

import useChatStore, { useChatOperations } from '@/store/useChatStore';

import PromptCard from '../homepage/components/promptCard';
import { ThreadCard } from './components/threadCard';

export default function ThreadPageView() {
  const params = useParams<{ url: string }>();
  const currentThread = useChatStore(
    (state) => state.threads[params.url] || [],
  );
  const { isLoading } = useChatOperations();

  const lastIndex = currentThread.length - 1;

  // typewriter state
  interface TypewriterProps {
    text: string;
    speed?: number;
  }

  const Typewriter = ({ text, speed = 10 }: TypewriterProps) => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setIndex((prev) => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, [index, text, speed]);

    return (
      <div className="whitespace-pre-wrap rounded-lg text-base text-black dark:text-white">
        {text.slice(0, index)}
      </div>
    );
  };
  const bottomRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentThread]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between pt-8 dark:bg-[#0d0d0d] lg:pt-20">
      <div className=" mb-12 flex w-[92%] flex-col gap-y-5 pb-80 lg:w-3/4">
        {currentThread.map((message, index) => {
          const isLastAnswer = index == lastIndex;

          const timeDiffInSeconds =
            (Date.now() - Number(message?.timestamp || 0)) / 1000;

          const isFreshlyAdded = timeDiffInSeconds < 20;

          return (
            <React.Fragment key={index}>
              <ThreadCard variant="question" questionLabel="A" loading={false}>
                {message.question}
              </ThreadCard>

              <ThreadCard variant="answer" loading={isLastAnswer && isLoading}>
                {isLastAnswer && !isLoading && isFreshlyAdded ? (
                  <Typewriter text={message.answer} speed={60} />
                ) : (
                  message.answer
                )}
              </ThreadCard>

              <div className="text-right text-xs text-gray-500">
                {new Date(message.timestamp || Date.now()).toLocaleString()}
              </div>
            </React.Fragment>
          );
        })}
        <div ref={bottomRef} />

        {currentThread.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No messages in this thread yet. Start a conversation!
          </div>
        )}
      </div>
      <PromptCard
        className="fixed bottom-0 !rounded-b-none bg-white dark:bg-[#0d0d0d]"
        initialThreadId={params.url}
      />
    </div>
  );
}
