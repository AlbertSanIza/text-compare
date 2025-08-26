import { diffWords } from 'diff'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'

interface DiffLine {
    lineNumber: number
    content: string
    type: 'added' | 'removed' | 'unchanged'
    diffParts: Array<{
        value: string
        added?: boolean
        removed?: boolean
    }>
}

export default function App() {
    const [leftText, setLeftText] = useState(`{
  "cSpell.language": "en",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": true,
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "git.autofetch": true,
  "tailwindCSS.classFunctions": [
    "clsx",
    "cn",
    "tw"
  ],
  "**/route-tree.gen.ts": true
}`)

    const [rightText, setRightText] = useState(`{
  "cSpell.language": "en",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "edisfsdfsdftor.formatOnSave": true,
  "files.associations": {
    "*.csdfsss": "tailwindcss"
  },
  "git.autofetch": true,
  "tailwindCSS.classFunctions": [
    "clsx",
    "cn",
    "tw"
  ],
  "**/rousdfsdfte-tree.gsdfsdfen.ts": true
}`)

    const diffLines = useMemo(() => {
        const leftLines = leftText.split('\n')
        const rightLines = rightText.split('\n')
        const maxLines = Math.max(leftLines.length, rightLines.length)
        const lines: DiffLine[] = []
        for (let i = 0; i < maxLines; i++) {
            const leftLine = leftLines[i] || ''
            const rightLine = rightLines[i] || ''

            if (leftLine === rightLine) {
                lines.push({
                    lineNumber: i + 1,
                    content: leftLine,
                    type: 'unchanged',
                    diffParts: [{ value: leftLine }]
                })
            } else {
                const diff = diffWords(leftLine, rightLine)
                const hasChanges = diff.some((part) => part.added || part.removed)

                if (hasChanges) {
                    lines.push({
                        lineNumber: i + 1,
                        content: rightLine,
                        type: 'added',
                        diffParts: diff
                    })
                } else {
                    lines.push({
                        lineNumber: i + 1,
                        content: leftLine,
                        type: 'removed',
                        diffParts: [{ value: leftLine }]
                    })
                }
            }
        }
        return lines
    }, [leftText, rightText])

    const handleClearAll = () => {
        setLeftText('')
        setRightText('')
    }

    return (
        <div>
            <div className="bg-green-600 p-6">
                <h1 className="mb-6 text-center text-6xl font-bold text-white">Text Compare</h1>
                <div className="flex items-center justify-center">
                    <Button onClick={handleClearAll}>Clear all</Button>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Text Area */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">Original Text</h3>
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
                                <textarea
                                    value={leftText}
                                    onChange={(e) => setLeftText(e.target.value)}
                                    placeholder="Enter or paste your original text here..."
                                    className="h-32 w-full resize-none border-0 bg-transparent font-mono text-sm focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Right Text Area */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">Modified Text</h3>
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
                                <textarea
                                    value={rightText}
                                    onChange={(e) => setRightText(e.target.value)}
                                    placeholder="Enter or paste your modified text here..."
                                    className="h-32 w-full resize-none border-0 bg-transparent font-mono text-sm focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Diff Display */}
                <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold text-gray-700">Differences</h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <div className="grid grid-cols-2 divide-x divide-gray-200">
                            {/* Left Diff */}
                            <div className="bg-gray-50">
                                <div className="border-b border-gray-200 bg-gray-100 px-4 py-2 font-medium text-gray-700">Original</div>
                                <div className="font-mono text-sm">
                                    {diffLines.map((line, index) => (
                                        <div key={`left-${index}`} className="flex hover:bg-gray-100">
                                            <div className="w-16 flex-shrink-0 border-r border-gray-200 bg-gray-50 px-2 py-1 text-right text-gray-500">
                                                {line.lineNumber}
                                            </div>
                                            <div className="flex-1 px-3 py-1">
                                                {line.type === 'removed' && <ArrowUp className="mr-1 inline h-4 w-4 text-green-600" />}
                                                {line.diffParts.map((part, partIndex) => (
                                                    <span key={partIndex} className={part.removed ? 'bg-red-200' : ''}>
                                                        {part.value}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Right Diff */}
                            <div className="bg-gray-50">
                                <div className="border-b border-gray-200 bg-gray-100 px-4 py-2 font-medium text-gray-700">Modified</div>
                                <div className="font-mono text-sm">
                                    {diffLines.map((line, index) => (
                                        <div key={`right-${index}`} className="flex hover:bg-gray-100">
                                            <div className="w-16 flex-shrink-0 border-r border-gray-200 bg-gray-50 px-2 py-1 text-right text-gray-500">
                                                {line.lineNumber}
                                            </div>
                                            <div className="flex-1 px-3 py-1">
                                                {line.type === 'added' && <ArrowDown className="mr-1 inline h-4 w-4 text-green-600" />}
                                                {line.diffParts.map((part, partIndex) => (
                                                    <span key={partIndex} className={part.added ? 'bg-blue-200' : ''}>
                                                        {part.value}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
