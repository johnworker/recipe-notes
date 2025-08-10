import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodeButton({ url }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn-ghost" onClick={()=>setOpen(true)}>QRcode</button>
      {open && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center z-50" onClick={()=>setOpen(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6" onClick={e=>e.stopPropagation()}>
            <QRCodeCanvas value={url} size={200} />
            <div className="text-center mt-3"><button className="btn-ghost" onClick={()=>setOpen(false)}>關閉</button></div>
          </div>
        </div>
      )}
    </>
  );
}
