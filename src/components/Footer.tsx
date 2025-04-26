
const Footer = () => {
  return (
    <div className="flex flex-row space-between bg-slate-300 text-black sticky bottom-0 w-[100%] h-10 items-center border-[1px] border-gray-700 mb-10">
        <div className="flex flex-row text-start w-[45%] ">
            <p className="font-bold pl-5">eGroceries</p>
        </div>
        <div className="flex flex-row justify-end  w-[45%]"> 
            <p className="font-bold pr-5">About Us</p>
            <p className="font-bold pl-5 items-end">@2025</p>
        </div>
    </div>
  )
}
export default Footer