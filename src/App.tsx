import { diffChars } from 'diff'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export default function App() {
    const [originalText, setOriginalText] = useState(localStorage.getItem('text-compare-original') || '')
    const [modifiedText, setModifiedText] = useState(localStorage.getItem('text-compare-modified') || '')

    useEffect(() => {
        localStorage.setItem('text-compare-original', originalText)
    }, [originalText])

    useEffect(() => {
        localStorage.setItem('text-compare-modified', modifiedText)
    }, [modifiedText])

    const totalLines = useMemo(() => Math.max(originalText.split('\n').length, modifiedText.split('\n').length), [originalText, modifiedText])

    const diffResult = useMemo(() => {
        if (!originalText && !modifiedText) {
            return []
        }
        return diffChars(originalText, modifiedText)
    }, [originalText, modifiedText])

    return (
        <div>
            <div className="bg-green-600">
                <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                    <h1 className="text-center text-4xl font-semibold text-white">Text Compare</h1>
                    <Button
                        size="sm"
                        onClick={() => {
                            setOriginalText('')
                            setModifiedText('')
                        }}
                    >
                        Clear all
                    </Button>
                </div>
            </div>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
                <div className="flex items-start gap-6">
                    <div className="grid w-full gap-3">
                        <Label htmlFor="original-text">Original</Label>
                        <Textarea
                            id="original-text"
                            className="bg-slate-50 font-mono text-xl md:text-xs"
                            placeholder="Enter or paste your original text here..."
                            value={originalText}
                            onChange={(event) => setOriginalText(event.target.value)}
                        />
                    </div>
                    <div className="grid w-full gap-3">
                        <Label htmlFor="modified-text">Modified</Label>
                        <Textarea
                            id="modified-text"
                            className="bg-slate-50 font-mono text-xl md:text-xs"
                            placeholder="Enter or paste your modified text here..."
                            value={modifiedText}
                            onChange={(event) => setModifiedText(event.target.value)}
                        />
                    </div>
                </div>
                <div className="flex rounded-md border bg-slate-50 p-6 font-mono text-xs">
                    {diffResult.length > 0 ? (
                        <>
                            <div className="mr-6 flex-shrink-0 select-none">
                                {Array.from({ length: totalLines }, (_, index) => (
                                    <div key={index}>{index + 1}</div>
                                ))}
                            </div>
                            <div className="flex-1 overflow-x-auto whitespace-pre">
                                {diffResult.map((item, index) => {
                                    const isOnlyNewLines = item.value
                                        .trim()
                                        .split('\n')
                                        .every((line) => line === '')
                                    return (
                                        <span
                                            key={index}
                                            className={cn(
                                                (item.added || isOnlyNewLines) && 'bg-green-200',
                                                item.removed && 'bg-red-200 text-red-800',
                                                isOnlyNewLines && 'block w-full'
                                            )}
                                        >
                                            {item.value}
                                        </span>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-500">Enter text in both fields to see the comparison</div>
                    )}
                </div>
            </div>
        </div>
    )
}
