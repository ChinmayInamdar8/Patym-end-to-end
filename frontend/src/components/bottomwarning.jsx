export const BottomWarning = ({label, where, to})=>{
    return (
        <div>
            <div className="inline">
            {label}
            </div>

            <div className="inline-block ml-1 underline text-blue-500">
                <a href={to}>{where}</a>
            </div>
        </div>
    )
}