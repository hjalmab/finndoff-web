'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import type { TreeNode } from '@/lib/tree'
import { createTree, filterNodes, toggleChecked } from '@/lib/tree'
import { TreeNodeItem } from './TreeNode'

interface TreePickerModalProps {
  title: string
  nodes: TreeNode[]
  checkedIds: Set<number>
  onClose: (checkedIds: Set<number>) => void
}

export function TreePickerModal({
  title,
  nodes,
  checkedIds: initialCheckedIds,
  onClose,
}: TreePickerModalProps) {
  const [checkedIds, setCheckedIds] = useState(initialCheckedIds)
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Build tree with parent references
  const tree = useMemo(() => createTree(nodes), [nodes])

  // Filter visible nodes
  const visibleNodes = useMemo(
    () => filterNodes(tree.rootNodes, filter),
    [tree.rootNodes, filter]
  )

  // Auto-expand when filtering
  useEffect(() => {
    if (filter.trim()) {
      const ids = new Set<number>()
      function collectIds(nodes: TreeNode[]) {
        for (const node of nodes) {
          if (node.children.length > 0) {
            ids.add(node.id)
            collectIds(node.children)
          }
        }
      }
      collectIds(visibleNodes)
      setExpandedIds(ids)
    } else {
      setExpandedIds(new Set())
    }
  }, [filter, visibleNodes])

  // Focus search on open
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose(checkedIds)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, checkedIds])

  function handleToggleCheck(node: TreeNode) {
    // Look up the node from the full tree (with parent refs) since filtered nodes lose parent refs
    const fullNode = tree.nodeMap.get(node.id)
    if (fullNode) {
      setCheckedIds(toggleChecked(fullNode, checkedIds))
    }
  }

  function handleToggleExpand(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 pt-[10vh]">
      <div className="mx-4 flex max-h-[70vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h3 className="font-display text-lg font-semibold text-navy-900">
            {title}
          </h3>
          <button
            type="button"
            onClick={() => onClose(checkedIds)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b px-5 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filtrer..."
              className="flex-1 text-sm outline-none placeholder:text-gray-400"
            />
            {filter && (
              <button
                type="button"
                onClick={() => setFilter('')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tree */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          {visibleNodes.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              Ingen treff
            </p>
          ) : (
            visibleNodes.map((node) => (
              <TreeNodeItem
                key={node.id}
                node={node}
                checkedIds={checkedIds}
                expandedIds={expandedIds}
                onToggleCheck={handleToggleCheck}
                onToggleExpand={handleToggleExpand}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-5 py-3">
          <span className="text-sm text-gray-500">
            {checkedIds.size} valgt
          </span>
          <button
            type="button"
            onClick={() => onClose(checkedIds)}
            className="rounded-lg bg-primary-500 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600"
          >
            Ferdig
          </button>
        </div>
      </div>
    </div>
  )
}
