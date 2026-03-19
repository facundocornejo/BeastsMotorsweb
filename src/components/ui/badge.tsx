type BadgeVariant = "success" | "warning" | "info" | "default" | "danger";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-green-wa/15 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  info: "bg-blue-light/15 text-blue-deep",
  default: "bg-gray-100 text-dark-600",
  danger: "bg-rose/15 text-rose-dark",
};

export default function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold uppercase rounded-[var(--radius-sm)] ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
