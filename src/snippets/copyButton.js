import React, { useState } from 'react';  
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';


export default function CopyButton({ title, text, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const iconColor = isHovered ? 'var(--text-accent)' : 'var(--text-body)';
  return (
    <button
       onClick={onClick}
        className="p-1 rounded-md hover:filter-blur-sm cursor-pointer"
        title={title}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        <DocumentDuplicateIcon color={iconColor} className="h-6 w-6" />
    </button>
  );
}