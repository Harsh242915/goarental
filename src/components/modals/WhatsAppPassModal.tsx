import React, { useState } from 'react';
import { X, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { RoomItem } from '../../types';

interface WhatsAppPassModalProps {
  room: RoomItem;
  onClose: () => void;
}

export const WhatsAppPassModal: React.FC<WhatsAppPassModalProps> = ({ room, onClose }) => {
  const [copied, setCopied] = useState(false);
  const guest = room.guest;

  const messageText = `🌴 *Welcome to VILLAS GOA LUXURY RESIDENCES* 🌴\n\nDear ${guest?.name || 'Guest'},\nYour reservation for *Room ${room.roomNumber} - ${room.name}* at ${room.clusterName} is confirmed!\n\n📋 *Booking Reference:* ${guest?.bookingRef || `VG-${room.roomNumber}`}\n📶 *High-Speed WiFi:* VillasGoa_Guest / Password: *GoaBreeze2024*\n📍 *Estate Location:* https://maps.google.com/?q=Villas+Goa+Nerul\n👨‍💼 *Your 24/7 Estate Butler:* Preetam (+91 77989 67689)\n\nWe have chilled your favorite tender coconut water upon your arrival. Have a pleasant stay!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = (guest?.phone || '+919820154312').replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(messageText);
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#075E54] text-white">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-semibold text-sm">Send WhatsApp Confirmation</h3>
              <p className="text-[11px] text-emerald-100">Direct message to {guest?.phone || '+91 98201 54312'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Preview Box */}
        <div className="p-6 bg-[#ECE5DD] space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-xs border border-stone-200 text-xs font-mono whitespace-pre-wrap text-stone-800 leading-relaxed border-l-4 border-l-[#25D366]">
            {messageText}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded p-3 text-[11px] text-amber-800">
            <strong>Note:</strong> Check-in details and villa directions will be sent directly to the guest's WhatsApp.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium rounded transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard' : 'Copy Text'}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSendWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send to WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
