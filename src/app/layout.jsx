import "./global.css";

export const metadata = {
  title: "SoundSnitch",
  description: "Discover your music personality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}