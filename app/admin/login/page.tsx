import Logo from "@/components/Logo";
import LoginForm from "@/components/admin/LoginForm";
import InstallPrompt from "@/components/InstallPrompt";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-ink">Sign in to MnT</h1>
          <p className="mt-1 text-sm text-slatey">Team &amp; admin access for mntfuture.com.</p>
          <LoginForm />
          <InstallPrompt />
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">MnT — Magizh NexGen Technologies</p>
      </div>
    </div>
  );
}
