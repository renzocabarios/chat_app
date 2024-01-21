"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidenav } from "@/components";
import style from "./style.module.css";
import { useAuthStore } from "@/states";
import { useEffect } from "react";
import { SOCKET } from "@/socket";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authStore = useAuthStore() as any;

  useEffect(() => {
    function onClientConnected(data: any) {
      alert(data);
      authStore.fetchClientId(data.clientId);
    }

    SOCKET.on(`clientConnected`, onClientConnected);

    return () => {
      SOCKET.off(`clientConnected`, onClientConnected);
    };
  }, [authStore.clientId]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={style.container}>
          <Sidenav />
          <div className={style.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
