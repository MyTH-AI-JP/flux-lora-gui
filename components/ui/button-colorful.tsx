import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface ButtonColorfulProps {
    icon?: ReactNode;
    label?: string;
    className?: string;
    variant?: "default" | "violet" | "emerald" | "amber" | "rose";
    onClick?: () => void;
}

export function ButtonColorful({
    icon,
    label,
    className,
    variant = "default",
    onClick,
    ...props
}: ButtonColorfulProps) {
    const gradients = {
        default: "from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
        violet: "from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500",
        emerald: "from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500",
        amber: "from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500",
        rose: "from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500",
    };

    const gradient = gradients[variant];

    return (
        <Button
            className={cn(
                "relative overflow-hidden bg-gradient-to-r transition-all duration-300",
                gradient,
                className
            )}
            onClick={onClick}
            {...props}
        >
            <div className="relative z-10 flex items-center justify-center">
                {icon && <span className="mr-2">{icon}</span>}
                {label && <span>{label}</span>}
            </div>
        </Button>
    );
} 