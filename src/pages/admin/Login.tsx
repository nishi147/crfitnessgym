import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("adminAuth", response.data.token);
      navigate("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-breathe" />
      
      <div className="glass rounded-xl p-8 w-full max-w-md relative z-10 border border-border/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading mb-2 text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">CR Fitness Control Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full glass rounded-lg px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground border border-border/50 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="admin@crfitness.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full glass rounded-lg px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground border border-border/50 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <Button type="submit" variant="hero" className="w-full py-6 mt-4">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
