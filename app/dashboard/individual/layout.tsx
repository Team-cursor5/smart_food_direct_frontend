import IndividualDashboardClient from './IndividualDashboardClient';

interface IndividualDashboardLayoutProps {
  children: React.ReactNode;
}

export default function IndividualDashboardLayout({ children }: IndividualDashboardLayoutProps) {
  return <IndividualDashboardClient>{children}</IndividualDashboardClient>;
} 