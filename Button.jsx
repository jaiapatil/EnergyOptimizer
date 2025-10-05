export function Button({ className = '', children, variant = 'default', ...props }) {
  const base = "px-4 py-2 rounded font-semibold transition";

  const variants = {
    default: "bg-white text-black",
    ghost: "bg-transparent hover:bg-white/10 text-white",
    outline: "border border-white text-white"
  };

  return (
    <button
      className={`${base} ${className || variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
