"use client";

import React, { useState, useEffect } from "react";
import AddNoteModal from "../modals/add-note-modal";
import AlertModal from "../modals/alert-modal";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <AddNoteModal />
      <AlertModal />
    </>
  );
};

export default ModalProvider;
