"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "520px",
}: ModalProps) {
  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              zIndex: 1040,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="position-fixed top-50 start-50 translate-middle"
            style={{
              width: "100%",
              maxWidth,
              zIndex: 1050,
            }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div
              className="bg-white rounded-5 shadow-lg p-4 position-relative"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
              }}
            >
              {/* Close */}
              <button
                className="border-0 fs-5 position-absolute text-danger top-0 btn fw-bold end-0 m-3 rounded-circle"
                onClick={onClose}
              >
                <IoMdClose />
              </button>

              {/* Header */}
              {(title || subtitle) && (
                <div className="mb-4">
                  {title && <h4 className="fw-bold mb-1">{title}</h4>}
                  {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
                </div>
              )}

              {/* Content */}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
