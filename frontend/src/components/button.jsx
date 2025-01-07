export const Button = ({label, callback})=>{
    return (
        <button type="button" className="text-white bg-gray-800   font-medium rounded-lg text-sm px-5 py-2.5 my-2 w-full focus:ring-gray-300 hover:bg-gray-900" onClick={callback}>{label}</button>
    )
}