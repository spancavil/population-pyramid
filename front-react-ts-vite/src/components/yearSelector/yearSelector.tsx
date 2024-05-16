import "./yearSelector.css"

type YearSelectorProps = {
    setYear: React.Dispatch<React.SetStateAction<number>>
}

const YearSelector = ({setYear}: YearSelectorProps) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement> | undefined
    ) => {
        setYear(Number(e?.target.value) || 2022)
    }

    return (
        <div className="selector-container">
            <h3>Select year:</h3>
            <select onChange={handleChange}>
                <option value="2010">2010</option>
                <option value="2022">2022</option>
            </select>
        </div>
    )
}

export default YearSelector
