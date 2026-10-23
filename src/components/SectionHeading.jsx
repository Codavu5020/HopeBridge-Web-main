export default function SectionHeading({ id, title, children, light = false }) {
  return (
    <div className={`section-heading${light ? ' on-dark' : ''}`}>
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}
