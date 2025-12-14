'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteButtonProps {
    id: string;
    deleteAction: (id: string) => Promise<void>;
}

export default function DeleteButton({ id, deleteAction }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
            setLoading(true);
            await deleteAction(id);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleDelete} className="inline-block">
            <button
                type="submit"
                disabled={loading}
                className="text-red-600 hover:text-red-900 disabled:opacity-50"
            >
                <Trash2 className="h-5 w-5" />
            </button>
        </form>
    );
}
