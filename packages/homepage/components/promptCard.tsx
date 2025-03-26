'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { FaArrowUp, FaMagic } from 'react-icons/fa';
import { IoTelescopeOutline } from 'react-icons/io5';
import { MdOutlineAttachFile } from 'react-icons/md';
import { SiPolestar } from 'react-icons/si';

/**
 * `AiPromptCard` is a UI component that allows users to interact with an AI assistant.
 * It contains a text input for questions, and several buttons for attaching files,
 * conducting deep research, improving the prompt, and submitting.
 *
 * @component
 * @example
 * ```tsx
 * <AiPromptCard />
 * ```
 */
const PromptCard: FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  return (
    <div className="flex w-2/3 flex-col  justify-between rounded-xl border border-solid p-5 shadow-xl">
      {/* Input Row */}
      <div className="flex items-start gap-x-2">
        <SiPolestar size={25} />
        <textarea
          placeholder="Ask AI a questions.."
          className="mb-2 flex h-32 w-full resize-none items-start justify-start focus:outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex w-full items-center justify-between">
        {/* Left Side Buttons */}
        <div className="flex items-center gap-x-3">
          {/* Attach Button */}
          <div className="flex w-fit items-center space-x-2 rounded-[5px] border border-solid border-gray-300 px-4 py-1 duration-300 hover:bg-gray-200">
            <MdOutlineAttachFile />
            <button>Attach</button>
          </div>

          {/* Deep Research Button */}
          <div className="flex w-fit items-center space-x-2 rounded-[5px] border border-solid border-gray-300 px-4 py-1 duration-300 hover:bg-gray-200">
            <IoTelescopeOutline />
            <button>Deep Research</button>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-x-3">
          {/* Improve Prompt Button with hover effect */}
          <div className="group flex w-fit cursor-pointer items-center rounded-[5px] border border-gray-300 px-3 py-1 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
            <FaMagic className="group-hover:fill-white" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-xs group-hover:opacity-100">
              Improve Prompt
            </span>
          </div>

          {/* Submit Button */}
          <div
            className={`${prompt.length > 0 ? 'bg-black hover:bg-purple-700' : 'cursor-not-allowed bg-gray-300'}  flex w-fit cursor-pointer items-center space-x-2 rounded-[5px] border border-solid border-gray-300 p-2 duration-300`}
          >
            <FaArrowUp fill="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
