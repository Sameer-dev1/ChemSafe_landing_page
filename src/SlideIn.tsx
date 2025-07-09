import React, { useRef, useEffect, useState } from "react";

interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

const getTransform = (direction: string) => {
  switch (direction) {
    case "left": return "translateX(-50px)";
    case "right": return "translateX(50px)";
    case "up": return "translateY(-50px)";
    case "down": return "translateY(50px)";
    default: return "translateY(50px)";
  }
};

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = "up",
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : getTransform(direction),
        transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}; 