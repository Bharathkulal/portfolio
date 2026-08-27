import React, { useState, useEffect } from 'react';
import { api } from './api';
import { Mail, MailOpen, Trash2, Loader2, Check, X } from 'lucide-react';

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await api.get('messages', true);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (msg) => {
    try {
      const updated = await api.put('messages', msg._id, { readStatus: !msg.readStatus });
      setMessages(prev => prev.map(m => m._id === msg._id ? updated : m));
      if (selectedMessage && selectedMessage._id === msg._id) {
        setSelectedMessage(updated);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete('messages', id);
      setDeleteConfirmId(null);
      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.readStatus) {
      // Auto mark as read when opened
      try {
        const updated = await api.put('messages', msg._id, { readStatus: true });
        setMessages(prev => prev.map(m => m._id === msg._id ? updated : m));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div>
        <h2 className="text-2xl font-serif font-bold text-brand-textPrimary">Inbox Messages</h2>
        <p className="text-xs text-brand-textSecondary mt-1">Read and moderate submissions received via the public contact terminal.</p>
      </div>

      {loading ? (
        <div className="h-64 flex justify-center items-center">
          <Loader2 className="animate-spin text-brand-accent mr-2" size={24} />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-textSecondary">Syncing inbox...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="h-64 flex flex-col justify-center items-center border border-dashed border-brand-border/40 rounded-3xl text-brand-textSecondary text-sm font-mono">
          <span>Inbox is completely clean. No messages received.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Messages list pane */}
          <div className="lg:col-span-2 space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {messages.map(msg => (
              <div 
                key={msg._id}
                onClick={() => handleOpenMessage(msg)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                  selectedMessage && selectedMessage._id === msg._id
                    ? 'bg-brand-accent/5 border-brand-accent/30'
                    : msg.readStatus
                      ? 'bg-brand-card/20 border-brand-border/40 hover:border-brand-border/80'
                      : 'bg-brand-card/45 border-brand-accent/20 hover:border-brand-accent/40 shadow-[0_0_10px_rgba(0,255,136,0.02)]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm ${msg.readStatus ? 'text-brand-textSecondary' : 'text-brand-textPrimary font-bold'}`}>
                    {msg.name}
                  </span>
                  <span className="text-[9px] font-mono text-brand-textSecondary">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-brand-accent block mt-0.5">{msg.email}</span>
                <span className="text-xs font-medium text-brand-textPrimary mt-2 block truncate">{msg.subject}</span>
                <p className="text-xs text-brand-textSecondary mt-1 line-clamp-1 truncate">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Message Reader pane */}
          <div className="lg:col-span-3">
            {selectedMessage ? (
              <div className="p-6 bg-brand-card/20 border border-brand-border/60 rounded-3xl space-y-6">
                {/* Actions */}
                <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleToggleRead(selectedMessage)}
                      className="bg-brand-bg border border-brand-border hover:border-brand-accent/30 text-brand-textSecondary hover:text-brand-accent p-2 rounded-xl flex items-center justify-center cursor-pointer"
                      title={selectedMessage.readStatus ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      {selectedMessage.readStatus ? <MailOpen size={14} /> : <Mail size={14} />}
                    </button>
                  </div>
                  
                  {deleteConfirmId === selectedMessage._id ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-red-400 font-mono">Confirm?</span>
                      <button onClick={() => handleDelete(selectedMessage._id)} className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg cursor-pointer"><Check size={12} /></button>
                      <button onClick={() => setDeleteConfirmId(null)} className="bg-brand-bg border border-brand-border text-brand-textSecondary p-1.5 rounded-lg cursor-pointer"><X size={12} /></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setDeleteConfirmId(selectedMessage._id)}
                      className="p-2 border border-brand-border hover:border-red-500/20 text-brand-textSecondary hover:text-red-400 rounded-xl cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <span className="text-[10px] text-brand-textSecondary font-mono block">TRANSMISSION_DETAILS:</span>
                  <h3 className="text-lg font-bold text-brand-textPrimary">{selectedMessage.name}</h3>
                  <a href={`mailto:${selectedMessage.email}`} className="text-xs font-mono text-brand-accent hover:underline block">
                    {selectedMessage.email}
                  </a>
                  <span className="text-[10px] font-mono text-brand-textSecondary block pt-1">
                    DATE: {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2 text-left pt-2 border-t border-brand-border/40">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary">Subject</span>
                  <div className="text-sm font-bold text-brand-textPrimary">{selectedMessage.subject}</div>
                </div>

                <div className="space-y-2 text-left pt-2">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary">Message content</span>
                  <p className="text-xs text-brand-textSecondary leading-relaxed whitespace-pre-wrap bg-black/40 border border-brand-border/40 p-4 rounded-2xl">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col justify-center items-center border border-dashed border-brand-border/40 rounded-3xl text-brand-textSecondary text-xs font-mono">
                <span>Select a message from the list to display details.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
