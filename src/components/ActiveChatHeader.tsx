'use client';

import { Info } from 'lucide-react';
import { useSimulationStore } from '@/hooks/useSimulationStore';

export function ActiveChatHeader() {
  const { situationBriefing, currentThread } = useSimulationStore();

  return (
    <header className="flex w-full items-center justify-between p-4 border-b bg-background">
      {/* Left Side: Larger Interlocutor Avatar */}
      <div className="flex items-center gap-4">
        {/* Avatar with Presence Indicator */}
        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400">
          <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
        </div>

        {/* Name and Role */}
        <div>
          <h2 className="text-lg font-bold">{currentThread?.chat_title || 'Jake Fischer'}</h2>
          <p className="text-sm text-muted-foreground">interlocutor role</p>
        </div>
      </div>

      {/* Right Side: Situation Briefing Spanning Across */}
      <div className="flex-1 ml-8 text-right">
        <div className="flex items-center justify-end gap-2 mb-2">
          <span className="text-sm font-bold">
            Situation: {situationBriefing?.goal || 'Scope Alignment'}
          </span>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-none">
          {situationBriefing?.context ||
            'Marcus is pushing for an out-of-scope mobile prototype to be delivered by tomorrow. You need to enforce project boundaries and defend the original Statement of Work without damaging the client relationship.'}
        </p>
      </div>
    </header>
  );
}
