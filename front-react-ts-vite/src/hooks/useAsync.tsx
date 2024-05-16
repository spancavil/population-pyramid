import { useCallback, useEffect, useState } from "react"

export default function useAsync(callback: any, dependencies = [] as any[]) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error>()
    const [value, setValue] = useState<Data>()

    const callbackMemoized = useCallback(() => {
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        callback()
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false))
    }, dependencies)

    useEffect(() => {
        callbackMemoized()
    }, [callbackMemoized])

    return { loading, error, value }
}