import React from 'react';
import { Toaster } from 'react-hot-toast';
export default function ToastHost(){
  return <Toaster position="top-center" toastOptions={{ duration: 2000 }} />;
}
