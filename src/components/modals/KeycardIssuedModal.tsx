import React from 'react';
import { CheckCircle2, Key, Radio, Wifi, Send, Printer } from 'lucide-react';
import { RoomItem } from '../../types';

interface KeycardIssuedModalProps {
  room: RoomItem;
  rfidTag: string;
  onClose: () => void;
  onOpenRegCard: () => void;
  onOpenWhatsApp: () => void;
}

export const KeycardIssuedModal: React.FC<KeycardIssuedModalProps> = ({
  room,
  rfidTag,
  onClose,
  onOpenRegCard,
  onOpenWhatsApp,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden text-center animate-in fade-in zoom-in duration-200">
        {/* Top visual banner */}
        <div className="bg-gradient-to-r from-[#1B6B76] to-[#0F3A41] p-6 text-white relative">
          <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3 backdrop-blur-xs border border-white/20">
            <Radio className="w-8 h-8 text-emerald-300 animate-pulse" />
          </div>
          <h3 className="font-serif text-xl font-bold">Check-In Completed</h3>
          <p className="text-xs text-teal-100 mt-1">
            RFID Keycard Programmed & Handed to Guest
          </p>
        </div>

        {/* Details Card */}
        <div className="p-6 space-y-4 text-xs text-stone-700">
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-left space-y-2">
            <div className="flex justify-between items-center border-b border-stone-200 pb-2">
              <span className="text-stone-500 uppercase font-semibold text-[10px]">Guest Name</span>
              <span className="font-bold text-stone-900 text-sm">{room.guest?.name || 'Michael Chang'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Assigned Suite:</span>
              <span className="font-semibold text-teal-800">Room {room.roomNumber} - {room.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Encoded RFID Key Tag:</span>
              <span className="font-mono font-bold text-stone-900 bg-white px-2 py-0.5 border border-stone-300 rounded">
                {rfidTag}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Security Hold Pre-Auth:</span>
              <span className="font-mono text-emerald-700 font-semibold">₹15,000 Authorized</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenRegCard();
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Reg Card
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenWhatsApp();
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-semibold rounded transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              WhatsApp Pass
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-2 py-2.5 bg-[#1B6B76] hover:bg-[#14535c] text-white font-semibold rounded transition-colors cursor-pointer"
          >
            Done & Return to Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
