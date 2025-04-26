

const SearchBar = () => {
  return (
    <div className="flex flex-row  items-center w-[750px]  ">
        <input type="text" placeholder="Search" className="border border-gray-300 rounded-md px-4 py-2 w-full" /> 
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
    </div>
  )
}
export default SearchBar