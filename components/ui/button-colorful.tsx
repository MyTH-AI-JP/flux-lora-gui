import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { buttonVariants } from "./button";

export interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    label?: string;
    children?: React.ReactNode;
    variant?: 'default' | 'violet' | 'emerald' | 'blue' | 'orange' | 'red';
}

export function ButtonColorful({
    className,
    icon,
    label,
    children,
    variant = 'default',
    ...props
}: ButtonColorfulProps) {
    // バリアントに基づいてグラデーションスタイルを決定
    const gradientStyles = {
        default: "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
        violet: "from-purple-500 to-violet-700 hover:from-purple-600 hover:to-violet-800",
        emerald: "from-emerald-500 to-green-700 hover:from-emerald-600 hover:to-green-800",
        blue: "from-blue-500 to-indigo-700 hover:from-blue-600 hover:to-indigo-800",
        orange: "from-orange-400 to-amber-700 hover:from-orange-500 hover:to-amber-800",
        red: "from-red-500 to-rose-700 hover:from-red-600 hover:to-rose-800"
    };

    return (
        <button
            className={cn(
                buttonVariants({ variant: "default" }),
                "bg-gradient-to-r text-white border-0",
                gradientStyles[variant],
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-center">
                {icon && <span className="mr-2">{icon}</span>}
                {label || children}
            </div>
        </button>
    );
} 