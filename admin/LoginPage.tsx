import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from './lib/supabase';

const LoginSchema = z.object({
  email:    z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});
type LoginInput = z.infer<typeof LoginSchema>;

// ── Rate limiting (sessionStorage — no persiste entre pestañas) ─
const SK_ATTEMPTS = 'adm_attempts';
const SK_LOCKOUT  = 'adm_lockout';

const getAttempts   = () => parseInt(sessionStorage.getItem(SK_ATTEMPTS) ?? '0', 10);
const getLockoutEnd = () => parseInt(sessionStorage.getItem(SK_LOCKOUT)  ?? '0', 10);
const bumpAttempts  = () => {
  const n = getAttempts() + 1;
  sessionStorage.setItem(SK_ATTEMPTS, String(n));
  // Lockout progresivo: 3 intentos → 30s · 5 intentos → 5 min
  if (n >= 5) sessionStorage.setItem(SK_LOCKOUT, String(Date.now() + 300_000));
  else if (n >= 3) sessionStorage.setItem(SK_LOCKOUT, String(Date.now() + 30_000));
  return n;
};
const resetRateLimit = () => {
  sessionStorage.removeItem(SK_ATTEMPTS);
  sessionStorage.removeItem(SK_LOCKOUT);
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [lockedUntil, setLockedUntil] = useState<number>(getLockoutEnd);
  const [remaining,   setRemaining]   = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Redirige si ya hay sesión activa
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin/dashboard', { replace: true });
    });
  }, [navigate]);

  // Cuenta atrás del lockout
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (lockedUntil <= Date.now()) { setRemaining(0); return; }

    const tick = () => {
      const r = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (r <= 0) {
        setRemaining(0);
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setRemaining(r);
      }
    };
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [lockedUntil]);

  const isLocked = remaining > 0;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit({ email, password }: LoginInput) {
    if (isLocked) return;

    setServerError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const attempts = bumpAttempts();
      const newLockout = getLockoutEnd();
      if (newLockout > Date.now()) setLockedUntil(newLockout);

      if (attempts >= 5) {
        setServerError('Demasiados intentos. Acceso bloqueado 5 minutos.');
      } else if (attempts >= 3) {
        setServerError(`Credenciales incorrectas. Espera ${30 - Math.floor((Date.now() - (newLockout - 30_000)) / 1000)}s antes de volver a intentarlo.`);
      } else {
        setServerError('Credenciales incorrectas. Verifica tu email y contraseña.');
      }
      return;
    }

    // Verificar que el usuario tiene fila en admin_users
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setServerError('Error al obtener usuario.'); return; }

    const { data: adminRow, error: dbErr } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (dbErr) {
      setServerError('Error de conexión. Inténtalo de nuevo.');
      return;
    }

    if (!adminRow) {
      await supabase.auth.signOut();
      setServerError('No tienes permisos de administrador.');
      return;
    }

    resetRateLimit();
    navigate('/admin/dashboard', { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Cabecera */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Panel Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Mándalo Bonito</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                disabled={isLocked}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="admin@ejemplo.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                {...register('password')}
                type="password"
                autoComplete="current-password"
                disabled={isLocked}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.password ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {/* Lockout banner */}
            {isLocked && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-700">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Demasiados intentos. Espera <strong>{remaining}s</strong> para continuar.</span>
              </div>
            )}

            {/* Error de servidor */}
            {serverError && !isLocked && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || isLocked}
              className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isSubmitting ? 'Accediendo…' : isLocked ? `Bloqueado (${remaining}s)` : 'Acceder'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Acceso restringido · Solo administradores
        </p>
      </div>
    </div>
  );
}
