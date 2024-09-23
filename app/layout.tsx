import { Suspense } from "react";
import { Header } from "../components/header";
import { AuthProvider } from "../hooks/auth-context";
import { UserProvider } from "../hooks/user-context";

export const metadata = {
  title: 'Finance Assistant',
  description: 'The assistant that helps you manage your finances',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <UserProvider>
              <Header />
              {children}
            </UserProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
