import { GraduationCap, HeartHandshake, Users } from 'lucide-react'

const icons = { GraduationCap, HeartHandshake, Users }

export default function Icon({ name, size = 28 }) {
  const Component = icons[name]
  return Component ? <Component size={size} aria-hidden="true" /> : null
}
