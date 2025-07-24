import "../../styles/quadriculado.css";
import { AuthProvider } from '@/contexts/AuthContexts';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <AuthProvider>
        {children}
    </AuthProvider>;
}