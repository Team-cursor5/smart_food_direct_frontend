import CharityDashboardClient from './CharityDashboardClient';

interface CharityDashboardLayoutProps {
  children: React.ReactNode;
}

export default function CharityDashboardLayout({ children }: CharityDashboardLayoutProps) {
  return <CharityDashboardClient>{children}</CharityDashboardClient>;
} 