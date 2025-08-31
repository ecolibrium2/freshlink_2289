/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "var(--color-border)", // slate-200
                input: "var(--color-input)", // white
                ring: "var(--color-ring)", // emerald-600
                background: "var(--color-background)", // white
                foreground: "var(--color-foreground)", // slate-900
                primary: {
                    DEFAULT: "var(--color-primary)", // emerald-600
                    foreground: "var(--color-primary-foreground)", // white
                },
                secondary: {
                    DEFAULT: "var(--color-secondary)", // slate-600
                    foreground: "var(--color-secondary-foreground)", // white
                },
                destructive: {
                    DEFAULT: "var(--color-destructive)", // red-500
                    foreground: "var(--color-destructive-foreground)", // white
                },
                muted: {
                    DEFAULT: "var(--color-muted)", // slate-50
                    foreground: "var(--color-muted-foreground)", // slate-500
                },
                accent: {
                    DEFAULT: "var(--color-accent)", // blue-500
                    foreground: "var(--color-accent-foreground)", // white
                },
                popover: {
                    DEFAULT: "var(--color-popover)", // white
                    foreground: "var(--color-popover-foreground)", // slate-900
                },
                card: {
                    DEFAULT: "var(--color-card)", // white
                    foreground: "var(--color-card-foreground)", // slate-900
                },
                success: {
                    DEFAULT: "var(--color-success)", // emerald-500
                    foreground: "var(--color-success-foreground)", // white
                },
                warning: {
                    DEFAULT: "var(--color-warning)", // amber-500
                    foreground: "var(--color-warning-foreground)", // white
                },
                error: {
                    DEFAULT: "var(--color-error)", // red-500
                    foreground: "var(--color-error-foreground)", // white
                },
            },
            borderRadius: {
                lg: "12px",
                md: "8px",
                sm: "6px",
                xl: "16px",
                "2xl": "20px",
            },
            fontFamily: {
                heading: ['Inter', 'monospace'],
                body: ['Inter', 'monospace'],
                caption: ['Inter', 'monospace'],
                data: ['Inter', 'monospace'],
            },
            boxShadow: {
                'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
                'strong': '0 8px 32px rgba(0, 0, 0, 0.16)',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
            transitionDuration: {
                '150': '150ms',
                '200': '200ms',
                '300': '300ms',
                '400': '400ms',
                '500': '500ms',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-up": {
                    from: { transform: "translateY(100%)" },
                    to: { transform: "translateY(0)" },
                },
                "bounce-in": {
                    "0%": { transform: "scale(0.3)", opacity: "0" },
                    "50%": { transform: "scale(1.05)" },
                    "70%": { transform: "scale(0.9)" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 5px rgba(5, 150, 105, 0.5)" },
                    "50%": { boxShadow: "0 0 20px rgba(5, 150, 105, 0.8)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.3s ease-out",
                "slide-up": "slide-up 0.3s ease-out",
                "bounce-in": "bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}