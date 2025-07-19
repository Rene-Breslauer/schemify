import React from 'react';

export default function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
    return (
      <div>
        <label className="block font-semibold mb-4">{label}</label>
        {type === 'textarea' ? (
          <textarea
            rows={2}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 border rounded"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 border rounded"
          />
        )}
      </div>
    );
}
  