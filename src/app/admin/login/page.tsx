"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: currentUser } }: { data: { user: unknown } }) => {
      if (currentUser) router.replace("/admin/vehiculos");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin/vehiculos");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-bg p-4">
      <div className="w-full max-w-sm bg-white rounded-[var(--radius)] shadow-lg p-8">
        <h1 className="font-display text-2xl font-bold text-blue-deep text-center mb-8">
          Beast Motors
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@beastmotors.com"
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-rose text-center">{error}</p>
          )}

          <Button type="submit" loading={loading} className="w-full mt-2">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
