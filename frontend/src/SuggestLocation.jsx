import { useState, useRef } from "react";

function SuggestLocation({ name, placeholder, value, onChange, classname, cityAutoComplete }){
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const timer = useRef(null);
    const containerRef = useRef(null);

    async function handleLocation(e){
        const value = e.target.value
        handleChange(e)
        if(timer.current){
            clearTimeout(timer.current)
        }
        if(value.length <= 2){
            setSuggestions([])
            return
        }
        timer.current = setTimeout(async () => {
            const cities = await cityAutoComplete(value)
            setSuggexstions(cities)
        }, 300)
    }

    useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleSelectSuggestion = (cityString) => {
        onChange({ target: { name: name, value: cityString } });
        setShowDropdown(false);
        setSuggestions([]);
    };

    return(
        <div className="relative w-full" ref={containerRef}>
            <input 
                type="text"
                name={name}
                id={name}
                value={value || ""}
                onChange={handleLocation}
                placeholder={placeholder}
                className={className}
                autoComplete="off"
            />
            {showDropdown && suggestions.length > 0 && (
                <ul className="absolute z-50 w-full left-0 mt-1 bg-surface-container-lowest border border-outline-variant/60 rounded-lg shadow-lg max-h-60 overflow-y-auto custom-scrollbar divide-y divide-outline-variant/20 bg-white text-on-surface">
                {suggestions.map((city, index) => (
                    <li 
                    key={index}
                    onClick={() => handleSelectSuggestion(city)}
                    className="px-4 py-3 text-body-md hover:bg-surface-container-high cursor-pointer transition-colors"
                    >
                    {city}
                    </li>
                ))}
                </ul>
            )}
        </div>
    )

}
export default SuggestLocation