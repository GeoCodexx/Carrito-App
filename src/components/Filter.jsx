import React, { useContext, useState } from "react";
import { FilterContext } from "../contexts/FilterProvider";
import { BiArrowFromRight } from "react-icons/bi";
import { ProductContext } from "../contexts/ProductProvider";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const navegar = useNavigate();

  const { isOpenFilter, handleClose } = useContext(FilterContext);

  const [categoryFilter, setCategoryFilter] = useState("selected");
  const [priceFilter, setPriceFilter] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);

  const { setFilterProducts } = useContext(ProductContext);

  /**HANDLE CATEFOY FILTER */
  const handleCategoryInput = (e) => {
    //console.log(e.target.value);
    setCategoryFilter(e.target.value);
  };

  /**HANDLE PRICE RANGE FILTER */
  const handlePrice = (e) => {
    //console.log(e.target.value);
    setPriceFilter(e.target.value);
  };

  /**HANDLE RATING FILTER */
  const handleRatingChange = (event) => {
    // Obtenemos el valor del input seleccionado (1 al 5) al leer el atributo "value" del input.
    const selectedRating = parseInt(event.target.value);
    setRatingValue(selectedRating);
  };

  /**APPLY FILTER OPTIONS*/
  const handleApplyFilter = () => {
    //console.log("Aplicando cambios filtro");
    setFilterProducts(
      categoryFilter,
      priceFilter,
      ratingValue /*, location.pathname*/
    );
    navegar("/filteredproducts");
  };

  /**CLEAN FILTER OPTIONS */
  const handleCleanFilter = () => {
    //console.log("Limpiar filtro");
    setCategoryFilter("selected");
    setPriceFilter(0);
    setRatingValue(0);
  };

  return (
    <div
      className={`${
        isOpenFilter ? "left-0" : "-left-full"
      } w-full bg-base-200 fixed top-[68px] h-full shadow-2xl md:w-[350px] xl:max-w-[350px] transition-all delay-150 duration-500 z-20 px-4 lg:px-[35px] rounded-s-md select-none border-t`}
    >
      <div className="flex justify-between items-center border-b-2 my-4">
        <h2 className="text-lg font-semibold text-center">
          FILTROS DE BÚSQUEDA
        </h2>
        {/**icono */}
        <div
          onClick={() => handleClose()}
          className="flex justify-center items-center tooltip tooltip-bottom"
          data-tip="Ocultar"
        >
          <button className="btn btn-ghost btn-circle">
            <BiArrowFromRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label className="label mb-2">
          <span className="label-text uppercase font-medium">Categoría:</span>
        </label>
        <select
          className="select select-bordered select-sm w-full max-w-xs"
          value={categoryFilter}
          onChange={handleCategoryInput}
        >
          <option value="selected" disabled>
            Seleccione una opción
          </option>
          <option value="men's clothing">Men's clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="label mb-2">
          <span className="label-text uppercase font-medium">Precio:</span>
        </label>

        <input
          type="range"
          min={0}
          max="500"
          value={priceFilter}
          className="range range-xs"
          step="100"
          onChange={handlePrice}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>0</span>
          <span>S/100</span>
          <span>S/200</span>
          <span>S/300</span>
          <span>S/400</span>
          <span>S/500</span>
        </div>
      </div>

      <div>
        <label className="label">
          <span className="label-text uppercase font-medium">Rating:</span>
        </label>
        <div className="rating py-2">
          <input
            type="radio"
            name="rating-1"
            value={0}
            className="rating-hidden"
            onChange={handleRatingChange}
            checked={ratingValue === 0}
          />
          <input
            type="radio"
            name="rating-1"
            value={1}
            className="mask mask-star"
            onChange={handleRatingChange}
            checked={ratingValue === 1}
          />
          <input
            type="radio"
            name="rating-1"
            value={2}
            className="mask mask-star"
            onChange={handleRatingChange}
            checked={ratingValue === 2}
          />
          <input
            type="radio"
            name="rating-1"
            value={3}
            className="mask mask-star"
            onChange={handleRatingChange}
            checked={ratingValue === 3}
          />
          <input
            type="radio"
            name="rating-1"
            value={4}
            className="mask mask-star"
            onChange={handleRatingChange}
            checked={ratingValue === 4}
          />
          <input
            type="radio"
            name="rating-1"
            value={5}
            className="mask mask-star"
            onChange={handleRatingChange}
            checked={ratingValue === 5}
          />
        </div>
      </div>

      <div className="flex flex-col justify-evenly mt-8 h-48">
        <button
          className="btn btn-success"
          onClick={handleApplyFilter}
          disabled={
            categoryFilter !== "selected" ||
            priceFilter !== 0 ||
            ratingValue !== 0
              ? ""
              : "disabled"
          }
        >
          Aplicar
        </button>
        <button className="btn btn-ghost" onClick={handleCleanFilter}>
          Limpiar
        </button>
        <button className="btn btn-ghost" onClick={() => handleClose()}>
          Cerrar
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Filter;
