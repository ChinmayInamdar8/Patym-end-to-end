export const Inputbox= ({label, placeholder, type})=>{
    return(
        <div>
            <div className="text-sm font-medium text-left pt-3 pb-2 ">
                {label}
            </div>
            <div className="">
                <input type={type} name="label" id="label" placeholder={placeholder} className="border border-slate-500 rounded-md focus:outline-none py-0.5 w-full px-2"/>
            </div>
        </div>
    )
}