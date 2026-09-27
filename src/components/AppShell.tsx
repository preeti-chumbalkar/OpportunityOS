import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Compass, CheckSquare, Target, User, Menu, X, BookMarked } from 'lucide-react';
import { useState } from 'react';
import styles from './AppShell.module.css';
import { useProfile } from '@/context/ProfileContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { profile } = useProfile();
  
  const avatarChar = profile?.name ? profile.name.charAt(0).toUpperCase() : 'S';
  const displayName = profile?.name || 'Student';

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Discover', path: '/discover', icon: Compass },
    { name: 'My Matches', path: '/matches', icon: BookMarked },
    { name: 'Skill Gaps', path: '/gaps', icon: Target },
    { name: 'Action Plan', path: '/plan', icon: CheckSquare },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <div className={styles.container}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <div className={styles.logo}>OpportunityOS</div>
        <button className={styles.menuBtn} onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>OpportunityOS</div>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            return (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={closeMobile}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <Icon size={20} className={styles.navIcon} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className={styles.sidebarFooter}>
          <div className={styles.userSnippet}>
            <div className={styles.avatar}>{avatarChar}</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{displayName}</div>
              <div className={styles.userRole}>Student</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && <div className={styles.overlay} onClick={closeMobile} />}

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
