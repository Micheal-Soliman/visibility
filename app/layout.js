import '../styles/globals.css';

export const metadata = {
  title: 'Visibility', icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
