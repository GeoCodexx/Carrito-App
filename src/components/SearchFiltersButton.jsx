import { useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FilterContext } from "../contexts/FilterProvider";

const SearchFiltersButton = () => {

    const {isOpenFilter, setIsOpenFilter} = useContext(FilterContext);

  return (
    <div className={`${
        !isOpenFilter ? "left-0" : "-left-full"
      } fixed hidden md:flex left-0 top-16 rounded-e-lg p-2 items-center mt-5 shadow-lg border z-10 bg-white transition-all duration-500`} >
      <span className="mr-2">Filtros</span>
      <div className="tooltip-right tooltip" data-tip="Filtros de Búsqueda">
      <button className="btn btn-circle btn-sm" onClick={()=>setIsOpenFilter(true)}>
        <AiOutlineArrowRight className="h-5 w-5" />
      </button></div>
    </div>
  );
};

export default SearchFiltersButton;
