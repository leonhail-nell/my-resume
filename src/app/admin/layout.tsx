import AuthSessionProvider from "./AuthSessionProvider";

// Note: middleware.ts handles redirecting unauthenticated /admin/* requests
// (except /admin/login) to the login page, so we don't re-check auth here.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
