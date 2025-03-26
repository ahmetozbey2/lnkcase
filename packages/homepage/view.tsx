'use client';

import * as React from 'react';

import PromptCard from './components/promptCard';

export default function HomepageView() {
  return (
    <main>
      <div className="flex h-full flex-col items-center justify-center max-lg:pt-28 lg:min-h-screen">
        <div className="mb-8 flex h-60 flex-col items-center justify-center">
          <img
            src="https://i.pinimg.com/originals/30/c4/70/30c4708468d108046b09feae6fee4eb1.gif"
            alt=""
            className="size-40"
          />
          <p className="text-3xl">Good Afternoon ,Nicolas</p>
          <p className="text-3xl">
            What's on <b className="font-medium text-purple-600">your mind ?</b>
          </p>
        </div>
        <PromptCard className="max-lg:fixed max-lg:bottom-0" />
      </div>
    </main>
  );
}
