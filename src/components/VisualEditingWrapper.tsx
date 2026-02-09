import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'

export async function VisualEditingWrapper() {
  const draft = await draftMode()
  if (!draft.isEnabled) return null

  return <VisualEditing />
}
