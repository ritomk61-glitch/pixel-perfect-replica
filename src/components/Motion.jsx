import { motion } from "framer-motion";

export function Page({ children, className = "" }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-screen pt-28 pb-24 ${className}`}
    >
      {children}
    </motion.main>
  );
}

export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Empty({ icon: Icon, title, text, children }) {
  return (
    <div className="glass mx-auto flex max-w-md flex-col items-center rounded-3xl px-8 py-16 text-center">
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent text-primary"><Icon size={24} /></div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
