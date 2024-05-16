import useAsync from "./useAsync"

type UseFetchProps = {
    endpoint: string,
    options?: object,
    dependencies?: Array<any>
} 

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
}

const domain = import.meta.env.VITE_API_URL

const useFetch = ({endpoint, options = {}, dependencies = []}: UseFetchProps) => {
    return useAsync(async () => {
        const res = await fetch(`${domain}/${endpoint}`, { ...DEFAULT_OPTIONS, ...options })
        if (res.ok) return res.json()
        const json = await res.json()
        return await Promise.reject(json)
    }, dependencies)
}

export default useFetch
