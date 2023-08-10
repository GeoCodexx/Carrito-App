import { useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FilterContext } from "../contexts/FilterProvider";
import { DarkModeContext } from "../contexts/DarkModeProvider";

const SearchFiltersButton = () => {
  const { isOpenFilter, setIsOpenFilter } = useContext(FilterContext);
  const {darkMode} = useContext(DarkModeContext);

  return (
    <div
      className={`${
        !isOpenFilter ? "left-0" : "-left-full"
      } fixed hidden left-0 top-16 md:flex  border ${darkMode ? 'border-gray-700' :'border-base-200'} rounded-e-lg p-2 items-center mt-5 shadow-lg z-10 bg-base-100 transition-all duration-500`}
    >
      <span className="mr-2">Filtros</span>
      <div className="tooltip-right tooltip" data-tip="Filtros de Búsqueda">
        <button
          className={`btn btn-circle btn-sm ${darkMode && 'btn-error'}`}
          onClick={() => setIsOpenFilter(true)}
        >
          <AiOutlineArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchFiltersButton;
