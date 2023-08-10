import { useContext } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import { FilterContext } from "../contexts/FilterProvider";
import { DarkModeContext } from "../contexts/DarkModeProvider";

const SearchFiltersButton = () => {
  const { isOpenFilter, setIsOpenFilter } = useContext(FilterContext);
  const {darkMode} = useContext(DarkModeContext);

  return (
    <div
      className={`${
        !isOpenFilter ? "left-0" : "-left-full"
      } fixed hidden left-0 top-16 md:flex  border ${darkMode ? 'border-gray-700' :'border-base-300'} rounded-e-lg p-2 items-center mt-5 shadow-lg z-10 bg-base-100 transition-all duration-500`}
    >
      <span className={`mr-2 ${darkMode && 'text-accent'} font-medium`}>Filtros</span>
      <div className="tooltip-right tooltip" data-tip="Mostrar filtros de búsqueda">
        <button
          className={`btn btn-circle btn-sm ${darkMode && 'text-accent'}`}
          onClick={() => setIsOpenFilter(true)}
        >
          <BiArrowFromLeft className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default SearchFiltersButton;
