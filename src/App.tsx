import { diffChars, type ChangeObject } from 'diff'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function App() {
    const [originalText, setOriginalText] = useState(localStorage.getItem('text-compare-original') || '')
    const [modifiedText, setModifiedText] = useState(localStorage.getItem('text-compare-modified') || '')

    useEffect(() => {
        localStorage.setItem('text-compare-original', originalText)
    }, [originalText])

    useEffect(() => {
        localStorage.setItem('text-compare-modified', modifiedText)
    }, [modifiedText])

    const diffResult = useMemo(() => {
        if (!originalText && !modifiedText) return []
        return diffChars(originalText, modifiedText)
    }, [originalText, modifiedText])

    const renderDiffText = (diffItems: ChangeObject<string>[]) => {
        return diffItems.map((item, index) => {
            if (item.removed) {
                return (
                    <span key={index} className="rounded bg-red-200 px-1 text-red-800">
                        {item.value}
                    </span>
                )
            } else if (item.added) {
                return (
                    <span key={index} className="rounded bg-green-200 px-1 text-green-800">
                        {item.value}
                    </span>
                )
            } else {
                return <span key={index}>{item.value}</span>
            }
        })
    }

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
                            className="bg-slate-50"
                            placeholder="Enter or paste your original text here..."
                            value={originalText}
                            onChange={(event) => setOriginalText(event.target.value)}
                        />
                    </div>
                    <div className="grid w-full gap-3">
                        <Label htmlFor="modified-text">Modified</Label>
                        <Textarea
                            id="modified-text"
                            className="bg-slate-50"
                            placeholder="Enter or paste your modified text here..."
                            value={modifiedText}
                            onChange={(event) => setModifiedText(event.target.value)}
                        />
                    </div>
                </div>
                <div className="rounded-md border bg-slate-50 p-6">
                    <div className="font-mono text-sm whitespace-pre-wrap">
                        {diffResult.length > 0 ? (
                            renderDiffText(diffResult)
                        ) : (
                            <span className="text-gray-500">Enter text in both fields to see the comparison</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
