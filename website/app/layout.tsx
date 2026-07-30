import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://college-final-ai-90plus.wangyiqing517517.chatgpt.site"),
  title: "期末周 AI 工作台｜大学生速通 90+",
  description:
    "北航经济学学生真实验证的大学生期末考试 AI Skill：上传老师 PPT、考试重点和往年题，生成知识地图、抢分顺序、完整题解、薄弱点变式与考前 30 分钟清单。",
  keywords: [
    "大学生期末考试",
    "AI复习",
    "期末周",
    "考试复习Skill",
    "文科复习",
    "往年题解析",
    "开卷考试",
    "考前速记",
    "北航",
    "北京航空航天大学",
    "BUAA",
    "北航经济学",
    "经济学期末考",
    "大学生Skills",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "期末周 AI 工作台｜上传资料，直接开工",
    description: "北航经济学学生真实验证：从老师 PPT、重点和往年题，生成一套能直接上考场的复习系统。",
    images: [{ url: "/og.png", width: 1678, height: 941 }],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "期末周 AI 工作台｜上传资料，直接开工",
    description: "北航经济学学生真实验证：从老师 PPT、重点和往年题，生成一套能直接上考场的复习系统。",
    images: ["/og.png"],
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
