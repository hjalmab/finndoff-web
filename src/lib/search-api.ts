import type { TreeNode } from './tree'

const BASE_URL = 'https://doffin-alerts-api-prod.azurewebsites.net'

// --- API response types ---

interface StedResponse {
  stedId: number
  navn: string
  nutsCode: string
  children: StedResponse[]
  aliasIds: number[]
}

interface CpvResponse {
  cpvKodeId: number
  kode: string
  beskrivelse: string
  children: CpvResponse[]
}

// --- Converters ---

function mapSted(s: StedResponse): TreeNode {
  return {
    id: s.stedId,
    label: s.navn,
    children: s.children.map(mapSted),
  }
}

function mapCpv(c: CpvResponse): TreeNode {
  return {
    id: c.cpvKodeId,
    label: `${c.kode} – ${c.beskrivelse}`,
    children: c.children.map(mapCpv),
  }
}

// --- Fetch functions ---

export async function fetchSteder(): Promise<TreeNode[]> {
  const res = await fetch(`${BASE_URL}/api/kodeliste/steder`)
  if (!res.ok) throw new Error('Failed to fetch steder')
  const data: StedResponse = await res.json()
  // API returns a single root node (Norge) — return its children as top-level
  return data.children.map(mapSted)
}

export async function fetchCpvKoder(): Promise<TreeNode[]> {
  const res = await fetch(`${BASE_URL}/api/kodeliste/cpvkoder`)
  if (!res.ok) throw new Error('Failed to fetch CPV-koder')
  const data: CpvResponse[] = await res.json()
  return data.map(mapCpv)
}
