'use client'

import { ChevronRight } from 'lucide-react'
import type { TreeNode as TreeNodeType } from '@/lib/tree'
import { isChecked, someChildrenChecked } from '@/lib/tree'

interface TreeNodeProps {
  node: TreeNodeType
  checkedIds: Set<number>
  expandedIds: Set<number>
  onToggleCheck: (node: TreeNodeType) => void
  onToggleExpand: (id: number) => void
  depth?: number
}

export function TreeNodeItem({
  node,
  checkedIds,
  expandedIds,
  onToggleCheck,
  onToggleExpand,
  depth = 0,
}: TreeNodeProps) {
  const checked = isChecked(node, checkedIds)
  const indeterminate = !checked && someChildrenChecked(node, checkedIds)
  const expanded = expandedIds.has(node.id)
  const hasChildren = node.children.length > 0

  return (
    <div>
      <div
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-gray-50"
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggleExpand(node.id)}
            className="flex h-5 w-5 shrink-0 items-center justify-center text-gray-400 transition-transform"
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
            />
          </button>
        ) : (
          <span className="w-5 shrink-0" />
        )}

        <label className="flex flex-1 cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={checked}
            ref={(el) => {
              if (el) el.indeterminate = indeterminate
            }}
            onChange={() => onToggleCheck(node)}
            className="h-4 w-4 shrink-0 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
          <span className="leading-tight">{node.label}</span>
        </label>
      </div>

      {hasChildren && expanded && (
        <div>
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              checkedIds={checkedIds}
              expandedIds={expandedIds}
              onToggleCheck={onToggleCheck}
              onToggleExpand={onToggleExpand}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
