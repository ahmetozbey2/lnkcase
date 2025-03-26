'use client';

import Link from 'next/link';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { RiChatNewLine } from 'react-icons/ri';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useChatOperations } from '@/store/useChatStore';

export function HambuergerMenu() {
  const { getAllThreads } = useChatOperations();
  const threads = getAllThreads();
  const firstMessages = Object.entries(threads).map(([id, messages]) => ({
    id,
    ...messages[0],
  }));
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HiOutlineMenuAlt2 className="text-2xl lg:hidden" />
      </SheetTrigger>
      <SheetContent className="border-none bg-white pb-40 dark:bg-[#0d0d0d]">
        <div className=" flex h-screen w-full flex-col border-r-2 border-solid border-r-gray-200 bg-[#FAFAFA] p-5 dark:bg-[#0d0d0d] max-lg:gap-y-10 lg:justify-between">
          <div>
            <Link
              href="/"
              className="flex cursor-pointer items-center gap-x-2 rounded-[5px] px-2 py-1 duration-300 hover:bg-gray-200"
            >
              <RiChatNewLine className="text-purple-700" />
              <p className="text-purple-700">Start New Chat</p>
            </Link>
            <div className="flex cursor-pointer items-center gap-x-2 rounded-[5px] px-2 py-1 duration-300 hover:bg-gray-200">
              <RiChatNewLine />
              <p>Chats</p>
            </div>
            <div className="mb-3 mt-10">
              <p className="pl-2 text-sm text-gray-600">Recents</p>
            </div>
            <div className=" flex max-h-[250px] flex-col gap-y-2 overflow-y-auto">
              {firstMessages.map((firstMessage) => {
                return (
                  <Link
                    href={`/thread/${firstMessage.id}`}
                    className="cursor-pointer rounded-[5px] px-2 py-1 text-sm duration-300 hover:bg-gray-200"
                  >
                    {firstMessage.question}
                  </Link>
                );
              })}
              {firstMessages.map((firstMessage) => {
                return (
                  <Link
                    href={`/thread/${firstMessage.id}`}
                    className="cursor-pointer rounded-[5px] px-2 py-1 text-sm duration-300 hover:bg-gray-200"
                  >
                    {firstMessage.question}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-x-2 rounded-[5px] border border-solid border-gray-400 p-2">
            <p className="flex size-8 items-center justify-center rounded-full bg-slate-500 p-2 text-white">
              A
            </p>
            <p className="text-sm ">nicolas@glnkco.com</p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>x</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
