import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa'; 
import { AiFillTikTok } from 'react-icons/ai'; 
import { Typography, Modal } from '@mui/material'; 
import { Close as CloseIcon, Share as ShareIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { WhatsApp, Instagram } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// -------------------------------------------------------------------------------- 
// ⚠️ 1. CRITICAL: IMAGE IMPORTS (Fixes EasyPaisa/JazzCash issue)
// If these paths are incorrect relative to your Links.tsx file, replace them.
// Ensure 'shahitarka.jpeg' and 'homebanner.jpeg' are also correctly linked.
// --------------------------------------------------------------------------------
import logo from '../assets/shahitarka.jpeg'; 
import homeBanner from '../assets/homebanner.jpeg'; 
import easypaisaLogo from '../assets/easypaisa.png'; // Your EasyPaisa image
import jazzcashLogo from '../assets/jazzcash.png'; // Your JazzCash image

const accounts = [
  { type: 'EasyPaisa', number: '03004390084', title: 'Nawazish Ali Niazi', icon: easypaisaLogo },
  { type: 'JazzCash', number: '03001490558', title: 'Nawazish Ali Niazi', icon: jazzcashLogo },
];

const WHATSAPP_NUMBER = "923287725050"; 

// --- FRAMER MOTION VARIANTS ---
// (Animations are smooth and stable)
const logoVariants = {
  hidden: { y: 100, opacity: 0, scale: 0.7 }, 
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 80, damping: 10, mass: 0.8, delay: 0.2 } }
};
const titleVariants = {
  hidden: { y: -80, opacity: 0 }, 
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 70, damping: 10, delay: 0.5 } }
};
const sloganVariants = {
  hidden: { y: -60, opacity: 0 }, 
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 70, damping: 10, delay: 0.7 } }
};
const buttonGroupVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, y: 0,
    transition: { delay: 1.0, when: "beforeChildren", staggerChildren: 0.2, type: "spring", stiffness: 80, damping: 12 } 
  }
};
const singleButtonVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -45 },
  visible: { 
    opacity: 1, y: 0, rotateX: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};
const item3DVariants = {
  hidden: { y: 40, opacity: 0, rotateX: -90 },
  visible: { y: 0, opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};
const modal3DVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};
// -----------------------------------------------------------------


const Links: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<number>(0); 
  const [openSocialModal, setOpenSocialModal] = useState(false); 

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500); 
  };

  const selectedAccount = accounts[selectedMethod];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 perspective-1000"> 
    
    {/* --- HERO SECTION --- */}
    <section 
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white border-b-4 border-amber-500"
      style={{ backgroundImage: `url(${homeBanner})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div> 
      
      <motion.div className="relative flex flex-col items-center justify-center p-4 text-center z-10" animate="visible">
        {/* Logo */}
        <motion.img 
          src={logo} 
          alt="Restaurant Logo" 
          className="w-28 h-28 md:w-36 md:h-36 rounded-full mb-4 border-4 border-white/80 shadow-2xl object-cover transform-style-3d" 
          initial="hidden" animate="visible" variants={logoVariants}
        />
        {/* Title */}
        <motion.h1 
          className="text-4xl md:text-6xl font-black mb-2 text-white tracking-wide drop-shadow-lg transform-style-3d" 
          initial="hidden" animate="visible" variants={titleVariants}
        >
          Shahi Tarka
        </motion.h1>
        {/* Slogan */}
        <motion.p 
          className="text-lg md:text-2xl font-light text-gray-200 italic transform-style-3d"
          initial="hidden" animate="visible" variants={sloganVariants}
        >
          The Royal Taste Awaits You.
        </motion.p>
      </motion.div>
      
      {/* 1. PRIMARY BUTTONS */}
      <motion.div 
        className="relative flex flex-col space-y-4 w-11/12 max-w-sm mt-12 z-10 md:flex-row md:space-y-0 md:space-x-6 md:max-w-xl"
        variants={buttonGroupVariants} initial="hidden" animate="visible"
      >
        {/* PAYMENT BUTTON */}
        <motion.button 
          onClick={() => setOpenPaymentModal(true)}
          className="w-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-red-700 text-white font-extrabold py-2.5 text-base md:text-lg rounded-xl 
                     transition-all shadow-xl hover:shadow-2xl border border-yellow-400 transform hover:scale-[1.03] active:scale-[0.98] transform-style-3d"
          variants={singleButtonVariants} whileHover={{ rotateY: 5 }} 
        >
          <span className="flex items-center">
            <PhoneIcon className="text-xl mr-2" />
            💳 Payment Details
          </span>
        </motion.button>
        
        {/* CONNECT BUTTON */}
        <motion.button 
          onClick={() => setOpenSocialModal(true)}
          className="w-full flex items-center justify-center bg-gray-900 text-white font-extrabold py-2.5 text-base md:text-lg rounded-xl 
                     transition-all shadow-xl hover:shadow-2xl border border-gray-700 transform hover:scale-[1.03] active:scale-[0.98] transform-style-3d"
          variants={singleButtonVariants} whileHover={{ rotateY: -5 }} 
        >
          <span className="flex items-center">
            <ShareIcon className="text-xl mr-2" />
            🔗 Connect With Us
          </span>
        </motion.button>
      </motion.div>
    </section>

    {/* --- PAYMENT MODAL --- */}
    <AnimatePresence>
      {openPaymentModal && (
        <Modal open={openPaymentModal} onClose={() => setOpenPaymentModal(false)} closeAfterTransition className="flex items-center justify-center">
          <motion.div variants={modal3DVariants} initial="hidden" animate="visible" exit="exit"
            className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-[95%] max-w-xs md:max-w-sm border border-gray-100 relative">
            
            <motion.button onClick={() => setOpenPaymentModal(false)} 
              className="absolute top-3 right-3 p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors transform-style-3d"
              whileHover={{ rotate: 90, scale: 1.1 }} aria-label="close modal">
              <CloseIcon className="text-2xl" />
            </motion.button>

            <Typography variant="h5" className="mb-6 text-gray-900 font-bold text-xl md:text-2xl">
              Payment Methods
            </Typography>

            {/* Payment Tabs (EasyPaisa/JazzCash) */}
            <div className="flex justify-center space-x-3 md:space-x-4 mb-4 mt-4"> 
              {accounts.map((account, index) => (
                <motion.div 
                  key={index}
                  onClick={() => setSelectedMethod(index)}
                  className={`cursor-pointer flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-xl p-1 md:p-2 transition-all duration-300 transform-style-3d
                              ${selectedMethod === index ? 'border-2 border-blue-600 bg-blue-50 shadow-md' : 'border border-gray-300 bg-white hover:bg-gray-50'}`} 
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.05)", rotateY: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Image is using the imported variable path */}
                  <img src={account.icon} alt={account.type} className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-lg mb-1" />
                  <Typography variant="body2" className="text-gray-700 font-medium text-xs">
                    {account.type}
                  </Typography>
                </motion.div>
              ))}
            </div>

            {/* Account Details Card */}
            <motion.div 
              className="p-4 md:p-6 rounded-xl shadow-inner border border-gray-200 bg-gray-50 transform-style-3d mt-6" 
              initial={{ rotateX: -10, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="p-0"> 
                <Typography variant="h6" className="text-gray-900 font-bold mb-2 text-lg md:text-xl">
                  {selectedAccount.title}
                </Typography>
                <div className="flex items-center justify-between">
                  <a href={`tel:${selectedAccount.number.replace(/\s/g, '')}`} className="no-underline">
                    <Typography 
                      variant="h5" 
                      className="text-gray-800 font-mono hover:text-blue-600 transition-colors cursor-pointer text-xl md:text-2xl"
                    >
                      {selectedAccount.number}
                    </Typography>
                  </a>
                  
                  <motion.button
                    onClick={() => copyToClipboard(selectedAccount.number, selectedMethod)}
                    className={`p-2 rounded-full ${copiedIndex === selectedMethod ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'}`}
                    initial={{ scale: 1 }}
                    animate={{ scale: copiedIndex === selectedMethod ? 1.3 : 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                    aria-label="copy account number"
                  >
                    <FaCopy className="text-lg" />
                  </motion.button>
                </div>
                {copiedIndex === selectedMethod && (
                    <Typography variant="caption" className="text-blue-600 mt-2 block text-right font-semibold">
                      Copied!
                    </Typography>
                  )}
              </div>
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>

    {/* --- SOCIAL MEDIA MODAL --- */}
    <AnimatePresence>
      {openSocialModal && (
        <Modal open={openSocialModal} onClose={() => setOpenSocialModal(false)} closeAfterTransition className="flex items-center justify-center">
          <motion.div variants={modal3DVariants} initial="hidden" animate="visible" exit="exit"
            className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-[95%] max-w-xs md:max-w-sm border border-gray-100 relative">
            
            <motion.button onClick={() => setOpenSocialModal(false)} 
              className="absolute top-3 right-3 p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              whileHover={{ rotate: -90, scale: 1.1 }} aria-label="close social modal">
              <CloseIcon className="text-2xl" />
            </motion.button>

            <Typography variant="h5" className="mb-8 text-gray-900 font-bold text-center text-xl md:text-2xl">
              Connect With Us
            </Typography>

            {/* Social Media Links */}
            <motion.div className="flex flex-col space-y-4 mt-4" initial="hidden" animate="visible">
              {/* WhatsApp (Working Link) */}
              <motion.a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-green-500 text-white p-3 md:p-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] transform-style-3d"
                variants={item3DVariants} whileHover={{ rotateY: 3, z: 10 }} 
              >
                <div className="flex items-center">
                    <WhatsApp fontSize="medium" className="mr-3 text-xl md:text-2xl" />
                    <Typography variant="h6" className="text-base md:text-lg font-semibold">WhatsApp</Typography>
                </div>
                <ShareIcon />
              </motion.a>
              
              {/* Instagram (Placeholder) */}
              <motion.a 
                href="https://www.instagram.com/yourinstagramprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-pink-700 text-white p-3 md:p-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] transform-style-3d"
                variants={item3DVariants} whileHover={{ rotateY: -3, z: 10 }}
              >
                <div className="flex items-center">
                    <Instagram fontSize="medium" className="mr-3 text-xl md:text-2xl" />
                    <Typography variant="h6" className="text-base md:text-lg font-semibold">Instagram</Typography>
                </div>
                <ShareIcon />
              </motion.a>
              
              {/* TikTok (Placeholder) */}
              <motion.a 
                href="https://www.tiktok.com/@yourtiktokprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gray-900 text-white p-3 md:p-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] transform-style-3d"
                variants={item3DVariants} whileHover={{ rotateY: 3, z: 10 }}
              >
                <div className="flex items-center">
                    <AiFillTikTok size={24} className="mr-3" />
                    <Typography variant="h6" className="text-base md:text-lg font-semibold">TikTok</Typography>
                </div>
                <ShareIcon />
              </motion.a>
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>

    {/* --- FOOTER --- */}
    <footer className="w-full mx-auto p-4 md:p-6 bg-gray-200 text-gray-700 border-t border-gray-300 text-center text-sm md:text-base">
      <p className="font-semibold text-gray-600">Need a Custom Software Solution? Contact TADHEX.</p>
      <p className="text-gray-500 mt-1 text-xs">© 2024 TADHEX. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default Links;