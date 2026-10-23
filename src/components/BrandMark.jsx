export default function BrandMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#0E2A36" />
      <circle cx="44" cy="22" r="8" fill="#FFC24B" />
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M8 34h48v6H8zM12 40h40v14h-8v-6a12 12 0 0 0-24 0v6h-8z"
      />
    </svg>
  )
}
