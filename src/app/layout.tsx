import "./globals.css";

type Metadata = {
  title: string;
  description: string;
};


export const metadata: Metadata = {
  title: "Weather App",
  description: "The best weather app for your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        {children}
      </body>
    </html>
  );
}
