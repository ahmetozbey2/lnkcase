import Link from 'next/link';
import * as React from 'react';
import { RiChatNewLine } from 'react-icons/ri';

export interface IAppProps {}

export default function Sidebar(props: IAppProps) {
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
        <div className=" flex flex-col gap-y-2">
          <p className="cursor-pointer rounded-[5px] px-2 py-1 text-sm duration-300 hover:bg-gray-200">
            Collaborate with Claude using...
          </p>
          <p className="cursor-pointer rounded-[5px] px-2 py-1 text-sm duration-300 hover:bg-gray-200">
            Collaborate with Claude using...
          </p>
          <p className="cursor-pointer rounded-[5px] px-2 py-1 text-sm duration-300 hover:bg-gray-200">
            Collaborate with Claude using...
          </p>
          <p className="cursor-pointer rounded-[5px] px-2 py-1 text-sm duration-300 hover:bg-gray-200">
            Collaborate with Claude using...
          </p>
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
