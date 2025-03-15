import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loraName: string;
}

export function DeleteConfirmDialog({ isOpen, onClose, onConfirm, loraName }: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Loraの削除</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-300">
            <span className="font-semibold text-white">{loraName}</span> を削除してもよろしいですか？
          </p>
          <p className="text-gray-400 text-sm mt-2">
            この操作は元に戻せません。
          </p>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            削除する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 