"use client";

import Link from "next/link";
import * as React from "react";
import { RiChatNewLine } from "react-icons/ri";

import { useChatOperations } from "@/store/useChatStore";

export default function Sidebar() {
  const { getAllThreads } = useChatOperations();
  const threads = getAllThreads();
  const firstMessages = Object.entries(threads).map(([id, messages]) => ({
    id,
    ...messages[0], // sadece ilk mesajı al
  }));

  console.log("flattened", firstMessages);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-1/5 flex-col justify-between border-r-2 border-solid border-r-gray-200 bg-[#FAFAFA] p-5 dark:border-r-gray-700 dark:bg-[#0d0d0d] max-lg:hidden lg:flex">
      <div>
        <Link href="/">
          <div className="mb-4 px-2">
            <h3 className="text-3xl font-bold text-black dark:text-white">
              G-LNK
            </h3>
          </div>
        </Link>
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-x-2 rounded-[5px] px-2 py-1 duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <RiChatNewLine className="text-purple-700 dark:text-purple-300" />
          <p className="text-purple-700 dark:text-purple-300">Start New Chat</p>
        </Link>
        <div className="flex cursor-pointer items-center gap-x-2 rounded-[5px] px-2 py-1 text-black duration-300 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
          <RiChatNewLine />
          <p>Chats</p>
        </div>
        <div className="mb-3 mt-10">
          <p className="pl-2 text-sm text-gray-600 dark:text-gray-400">
            Recents
          </p>
        </div>
        <div className="flex max-h-[450px] flex-col gap-y-2 overflow-y-auto">
          {isClient &&
            firstMessages.reverse().map((firstMessage, index) => {
              return (
                <Link
                  key={index}
                  href={`/thread/${firstMessage.id}`}
                  className="cursor-pointer rounded-[5px] px-2 py-1 text-sm text-black duration-300 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
                  {firstMessage.question.length > 30
                    ? `${firstMessage.question.slice(0, 30)}...`
                    : firstMessage.question}
                </Link>
              );
            })}
        </div>
      </div>

      <div className="flex items-center gap-x-2 rounded-[5px] border border-solid border-gray-400 p-2 dark:border-gray-600">
        <p className="flex size-8 items-center justify-center rounded-full bg-slate-500 text-white dark:bg-slate-700">
          A
        </p>
        <p className="text-sm text-black dark:text-white">nicolas@glnkco.com</p>
      </div>
    </div>
  );
}
