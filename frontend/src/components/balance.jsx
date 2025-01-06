export const Balance = ({value})=>{
    return (
        <div className="flex">
            <div className="font-semibold text-lg">
                Your Balance:
            </div>
            <div className="font-normal ml-3 text-lg">
                Rs {value}
            </div>
        </div>
    )
}