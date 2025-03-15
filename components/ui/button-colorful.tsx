import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { buttonVariants } from "./button";

export interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    label?: string;
    children?: React.ReactNode;
}

export function ButtonColorful({
    className,
    icon,
    label,
    children,
    ...props
}: ButtonColorfulProps) {
    return (
        <button
            className={cn(
                buttonVariants({ variant: "default" }),
                "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0",
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