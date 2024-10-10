"use client";

import { useEffect, useRef } from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

export const ConnectBtn = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();


  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (isConnected && !chain) {
    return (
      <button className="btn" onClick={openChainModal}>
        Wrong network
      </button>
    );
  }

  return (
    <div className="max-w-5xl w-full flex items-center justify-between">
      {isConnected && (
        <button className="btn" onClick={openAccountModal}>
          {address}
        </button>
      )}
      <button
        className="btn"
        onClick={async () => {
          openConnectModal?.();
        }}
        // disabled={isConnecting}
      >
        {isConnecting ? "Connecting...." : isConnected ? address : "Connect your wallet" }
      </button>
      <button className="btn" onClick={openChainModal}>
        Switch Networks
      </button>
    </div>
  );
};
