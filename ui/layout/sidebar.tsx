'use client';

import Link from 'next/link';
import * as React from 'react';
import { RiChatNewLine } from 'react-icons/ri';

import { useChatOperations } from '@/store/useChatStore';

export default function Sidebar() {
  const { createThread, addMessageToThread, getAllThreads } =
    useChatOperations();
  const threads = getAllThreads();
  console.log('threads', threads);
  const firstMessages = Object.entries(threads).map(([id, messages]) => ({
    id,
    ...messages[0], // sadece ilk mesajı al
  }));

  console.log('flattened', firstMessages);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="fixed left-0 top-0 flex h-screen w-1/5 flex-col justify-between border-r-2 border-solid border-r-gray-200 bg-[#FAFAFA] p-5">
      <div>
        <Link href="/">
          <div className="mb-4 px-2">
            <h3 className="text-3xl font-bold">G-LNK</h3>
          </div>
        </Link>
        <div className="flex cursor-pointer items-center gap-x-2 rounded-[5px] px-2 py-1 duration-300 hover:bg-gray-200">
          <RiChatNewLine className="text-purple-700" />
          <p className="text-purple-700">Start New Chat</p>
        </div>
        <div className="flex cursor-pointer items-center gap-x-2 rounded-[5px] px-2 py-1 duration-300 hover:bg-gray-200">
          <RiChatNewLine />
          <p>Chats</p>
        </div>
        <div className="mb-3 mt-10">
          <p className="pl-2 text-sm text-gray-600">Recents</p>
        </div>
        <div className=" flex max-h-[450px] flex-col gap-y-2 overflow-y-auto">
          {isClient &&
            firstMessages.reverse().map((firstMessage, index) => {
              return (
                <Link
                  key={index}
                  href={`/thread/${firstMessage.id}`}
                  className="cursor-pointer rounded-[5px] px-2 py-1 text-sm duration-300 hover:bg-gray-200"
                >
                  {firstMessage.question.length > 30
                    ? `${firstMessage.question.slice(0, 30)}...`
                    : firstMessage.question}
                </Link>
              );
            })}
        </div>
      </div>

      <div className="flex items-center gap-x-2 rounded-[5px] border border-solid border-gray-400 p-2">
        <p className="flex size-8 items-center justify-center rounded-full bg-slate-500 p-2 text-white">
          A
        </p>
        <p className="text-sm ">ahmet1ozbey@gmail.com</p>
      </div>
    </div>
  );
}
