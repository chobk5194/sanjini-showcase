import type { Metadata } from "next";
import { Do_Hyeon, Noto_Sans_KR } from "next/font/google";

import "./globals.css";

const bodyFont = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-body"
});

const displayFont = Do_Hyeon({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "산지니 원정대",
  description: "대학생이 캠퍼스 활동을 미션처럼 수행하고 기록을 남기는 개인용 캠퍼스 RPG형 기록 앱"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
