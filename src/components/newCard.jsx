export function Card({ children, className = "" }) {
  return (
    <div className={`bg-gray-800 rounded-xl overflow-hidden shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-4 sm:p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight ${className}`}>
      {children}
    </h2>
  );
}