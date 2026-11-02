import { motion } from "framer-motion";
import hero from "@/assets/hero-chip.jpg";

export function AuthShell({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
        <div className="absolute bottom-16 left-12 max-w-sm">
          <span className="eyebrow">NEXUS ID</span>
          <p className="mt-3 font-display text-3xl font-semibold">One account for every build, order and BOM.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-sm">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-10">{children}</div>
        </motion.div>
      </div>
    </main>
  );
}
