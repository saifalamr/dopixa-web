export function BrandMark({ inverse = false, size = 34, className }: { inverse?: boolean; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
    <path fill={inverse ? "#FAF7F2" : "#0F3D32"} fillRule="evenodd" d="M9 7h19a25 25 0 1 1 0 50H9V7Zm10 10v30h9a15 15 0 1 0 0-30h-9Z" />
    <path fill="#FF7F5E" d="M44 45h10v10H44z" />
  </svg>;
}
