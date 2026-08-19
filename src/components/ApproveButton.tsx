import React, { useState } from 'react';

// 1. Definisi Tipe Data Props (Wajib di TypeScript)
interface ApproveButtonProps {
  leadId: string;
  onApprovalSuccess?: (leadId: string) => void;
}

// 2. Komponen Utama
export default function ApproveButton({ leadId, onApprovalSuccess }: ApproveButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleApprove = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const webhookUrl = import.meta.env.VITE_N8N_APPROVAL_WEBHOOK_URL;
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId }),
      });

      if (!response.ok) {
        throw new Error('Gagal memproses approval');
      }

      if (onApprovalSuccess) {
        onApprovalSuccess(leadId);
      }
    } catch (error) {
      console.error('Error saat approve:', error);
      alert('Gagal memproses approval. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleApprove}
      disabled={isLoading}
      style={{
        padding: '8px 16px',
        backgroundColor: isLoading ? '#a0aec0' : '#3182ce',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {isLoading ? 'Memproses...' : 'Approve'}
    </button>
  );
}