import "./globals.css";
export const metadata = {
    title: "ApexIQ | Institutional AI Investment Research Platform",
    description: "Autonomous multi-agent equity analyst built with LangGraph.js, Next.js 15, and Recharts.",
};
export default function RootLayout({ children, }) {
    return (<html lang="en" className="font-sans h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>);
}
