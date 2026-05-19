/**
 * AdminProtected — envuelve AuthGuard + DashboardPage en un único chunk lazy.
 * Al ser importado con React.lazy(), el SDK completo de Supabase
 * (auth, realtime, storage) solo se descarga cuando alguien visita /admin.
 * Los visitantes públicos nunca pagan ese coste.
 */
import AuthGuard    from './components/AuthGuard';
import DashboardPage from './DashboardPage';

export default function AdminProtected() {
  return (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  );
}
