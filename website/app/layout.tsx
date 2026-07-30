import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "大学生期末周 AI 速通 90+",
  description:
    "把老师 PPT、考试重点、作业和往年题转化为能直接上考场的知识框架、答题模板与考前速记。",
  keywords: [
    "大学生期末考试",
    "AI复习",
    "期末周",
    "考试复习Skill",
    "文科复习",
    "往年题解析",
    "开卷考试",
    "考前速记",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
