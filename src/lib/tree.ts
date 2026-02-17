// Tree utilities for hierarchical data (locations, CPV codes)

export interface TreeNode {
  id: number
  label: string
  children: TreeNode[]
  parent?: TreeNode
}

export interface Tree {
  rootNodes: TreeNode[]
  nodeMap: Map<number, TreeNode>
}

/** Build a Tree from raw API nodes, linking parent references and building a flat lookup map. */
export function createTree(rawNodes: TreeNode[]): Tree {
  const nodeMap = new Map<number, TreeNode>()

  function register(node: TreeNode, parent?: TreeNode) {
    node.parent = parent
    nodeMap.set(node.id, node)
    for (const child of node.children) {
      register(child, node)
    }
  }

  for (const root of rawNodes) {
    register(root)
  }

  return { rootNodes: rawNodes, nodeMap }
}

/** Check if a node or any of its ancestors is in the checked set. */
export function isChecked(node: TreeNode, checkedIds: Set<number>): boolean {
  let current: TreeNode | undefined = node
  while (current) {
    if (checkedIds.has(current.id)) return true
    current = current.parent
  }
  return false
}

/** Check if some (but not all) descendants are checked — for indeterminate state. */
export function someChildrenChecked(
  node: TreeNode,
  checkedIds: Set<number>
): boolean {
  for (const child of node.children) {
    if (checkedIds.has(child.id) || someChildrenChecked(child, checkedIds)) {
      return true
    }
  }
  return false
}

/** Get all descendant IDs (not including the node itself). */
function getDescendantIds(node: TreeNode): number[] {
  const ids: number[] = []
  for (const child of node.children) {
    ids.push(child.id)
    ids.push(...getDescendantIds(child))
  }
  return ids
}

/** Get all sibling nodes (excluding the node itself). */
function getSiblings(node: TreeNode): TreeNode[] {
  if (!node.parent) return []
  return node.parent.children.filter((n) => n.id !== node.id)
}

/**
 * Toggle a node in the checked set, handling parent/child cascading:
 * - Checking a parent implicitly checks all children (remove child IDs, add parent)
 * - Unchecking a child when parent is checked: uncheck parent, check all siblings
 * - Checking all siblings auto-checks the parent
 */
export function toggleChecked(
  node: TreeNode,
  checkedIds: Set<number>
): Set<number> {
  const next = new Set(checkedIds)
  const wasChecked = isChecked(node, checkedIds)

  if (wasChecked) {
    // Unchecking — if node itself is in the set, just remove it + descendants
    if (next.has(node.id)) {
      next.delete(node.id)
      for (const id of getDescendantIds(node)) {
        next.delete(id)
      }
    } else {
      // An ancestor is checked — uncheck ancestors up the chain and check siblings at each level
      let current: TreeNode | undefined = node
      while (current?.parent) {
        if (next.has(current.parent.id)) {
          next.delete(current.parent.id)
          // Check all siblings of current node
          for (const sibling of getSiblings(current)) {
            if (!isChecked(sibling, next)) {
              next.add(sibling.id)
            }
          }
          break
        }
        current = current.parent
      }
    }
  } else {
    // Checking — add node, remove any checked descendants (parent supersedes)
    next.add(node.id)
    for (const id of getDescendantIds(node)) {
      next.delete(id)
    }
    // If all siblings are now checked, collapse into parent
    collapseIntoParent(node, next)
  }

  return next
}

/** If all children of a parent are checked, replace with the parent ID. */
function collapseIntoParent(node: TreeNode, checkedIds: Set<number>) {
  if (!node.parent) return
  const allSiblingsChecked = node.parent.children.every((child) =>
    checkedIds.has(child.id)
  )
  if (allSiblingsChecked) {
    for (const child of node.parent.children) {
      checkedIds.delete(child.id)
    }
    checkedIds.add(node.parent.id)
    // Recurse up
    collapseIntoParent(node.parent, checkedIds)
  }
}

/** Filter tree nodes by search text, keeping parents of matching nodes visible. */
export function filterNodes(
  nodes: TreeNode[],
  query: string
): TreeNode[] {
  if (!query.trim()) return nodes
  const lower = query.toLowerCase()

  function matches(node: TreeNode): TreeNode | null {
    const childResults = node.children
      .map(matches)
      .filter((n): n is TreeNode => n !== null)

    if (
      node.label.toLowerCase().includes(lower) ||
      childResults.length > 0
    ) {
      return { ...node, children: childResults }
    }
    return null
  }

  return nodes.map(matches).filter((n): n is TreeNode => n !== null)
}

/** Get display labels for checked IDs from the node map. */
export function getCheckedLabels(
  checkedIds: Set<number>,
  nodeMap: Map<number, TreeNode>
): { id: number; label: string }[] {
  return Array.from(checkedIds)
    .map((id) => {
      const node = nodeMap.get(id)
      return node ? { id, label: node.label } : null
    })
    .filter((n): n is { id: number; label: string } => n !== null)
}
