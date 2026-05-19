import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Status = 'loading' | 'authorized' | 'forbidden' | 'network_error';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login', { replace: true });
        return;
      }

      const { data: adminRow, error: dbErr } = await supabase
        .from('admin_users')
        .select('id, role')
        .eq('id', session.user.id)
        .maybeSingle();

      // SEGURIDAD: distinguir error de red de "usuario no autorizado".
      // Si hay un error de BBDD/red NO hacemos signOut — eso sería un DoS
      // auto-infligido si la red es inestable.
      if (dbErr) {
        if (!cancelled) setStatus('network_error');
        return;
      }

      // adminRow === null significa que la fila no existe → no es admin
      if (!adminRow) {
        await supabase.auth.signOut();
        navigate('/admin/login', { replace: true });
        return;
      }

      if (!cancelled) setStatus('authorized');
    }

    verify();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') navigate('/admin/login', { replace: true });
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Verificando acceso…</p>
        </div>
      </div>
    );
  }

  if (status === 'network_error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm px-4">
          <p className="text-red-600 font-semibold mb-2">Error de conexión</p>
          <p className="text-gray-500 text-sm">No se pudo verificar tu sesión. Comprueba tu conexión y recarga la página.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (status === 'forbidden') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 font-semibold">No tienes permisos de administrador.</p>
      </div>
    );
  }

  return <>{children}</>;
}
