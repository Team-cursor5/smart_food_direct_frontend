import BusinessDashboardClient from './BusinessDashboardClient';

interface BusinessDashboardLayoutProps {
  children: React.ReactNode;
}

export default function BusinessDashboardLayout({ children }: BusinessDashboardLayoutProps) {
  return <BusinessDashboardClient>{children}</BusinessDashboardClient>;
}
