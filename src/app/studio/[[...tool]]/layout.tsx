export const metadata = {
  title: 'Finndoff CMS',
  description: 'Content management for Finndoff',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
