import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SidebarContext } from "../contexts/SidebarProvider";
import { CartContext } from "../contexts/CartProvider";
import { IoMdSearch } from "react-icons/io";
import { VscFilter } from "react-icons/vsc";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { ProductContext } from "../contexts/ProductProvider";
import { MdSearch } from "react-icons/md";
import logoImage from "../assets/logo-cart-96x96.svg";
import { DarkModeContext } from "../contexts/DarkModeProvider";

const NavBar = () => {
  const { toggleDarkMode } = useContext(DarkModeContext);

  const inputSearchRef = useRef();
  //const location = useLocation();
  const navegar = useNavigate();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("selected");
  const [priceFilter, setPriceFilter] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);

  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { state, subtotal } = useContext(CartContext);
  const { setSearchWord, result, setFilterProducts } =
    useContext(ProductContext);

  /**BUSQUEDA DE ARTÍCULOS */

  useEffect(() => {
    const getData = setTimeout(() => {
      setSearchWord(search);
    }, 1200);

    return () => clearTimeout(getData);
  }, [search]);

  const handleClickSearch = () => {
    window.modal_search.showModal();
    inputSearchRef.current.focus();
  };

  const handleClickFilter = () => {
    window.modal_filter.showModal();
  };

  /**HANDLE CATEFOY FILTER */
  const handleCategoryInput = (e) => {
    setCategoryFilter(e.target.value);
  };

  /**HANDLE PRICE RANGE FILTER */
  const handlePrice = (e) => {
    setPriceFilter(e.target.value);
  };

  /**HANDLE RATING FILTER */
  const handleRatingChange = (event) => {
    // Obtenemos el valor del input seleccionado (1 al 5) al leer el atributo "value" del input.
    const selectedRating = parseInt(event.target.value);
    console.log("Rating:", event.target.value);
    setRatingValue(selectedRating);
  };

  /**APPLY FILTER OPTIONS*/
  const handleApplyFilter = () => {
    setFilterProducts(categoryFilter, priceFilter, ratingValue);
    window.modal_filter.close();
    navegar("/filteredproducts");
  };

  /**CLEAN FILTER OPTIONS */
  const handleCleanFilter = () => {
    setCategoryFilter("selected");
    setPriceFilter(0);
    setRatingValue(0);
  };

  //close dropdown menu
  const handleClickMenu = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  const handleDialogSearch = () => {
    window.modal_search.close();
    setSearch("");
  };

  return (
    <nav className="shadow-lg fixed z-10 w-full">
      <div className="navbar bg-base-100 lg:px-5">
        <div className="navbar-start">
          {/**BUTTON MENU MOVIL */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden btn-circle">
              <AiOutlineMenu className="h-5 w-5" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={handleClickMenu}>
                <Link to="/">Inicio</Link>
              </li>
              <li onClick={handleClickMenu}>
                <Link to="/news">Novedades</Link>
              </li>
              <li onClick={handleClickMenu}>
                <Link to="/bestsellers">Más Vendidos</Link>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-lg lg:text-2xl"
          >
            <img src={logoImage} className="w-8 lg:w-10" alt="logo" />
            Carrito App
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li tabIndex={0}>
              <NavLink to="/news">Novedades</NavLink>
            </li>
            <li>
              <NavLink to="/bestsellers">Más Vendidos</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {/**BUTTON SEARCH MAIN*/}
          <div className="form-control hidden md:flex relative w-full">
            <div className="flex justify-center items-center px-2 ml-1 w-full">
              <MdSearch className="-mr-10 z-10 text-gray-500" />
              <input
                type="search"
                placeholder="Buscar..."
                className="input input-bordered input-sm w-full xl:w-96 md:w-[233px] ml-5 pl-6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/**RESULT BOX MAIN*/}
            <div className="px-3 text-sm absolute top-6 right-0 w-full flex justify-center">
              <ul
                className={`w-[233px] xl:w-96 p-2 shadow-lg menu dropdown-content z-[1] bg-base-100 rounded-b-md border border-t-0 ml-1 ${
                  search === "" && "hidden"
                }`}
              >
                {result.map((r, i) => (
                  <li
                    key={i}
                    className="md:max-w-[220px] overflow-hidden md:text-xs xl:max-w-none"
                  >
                    <Link to={`/product/${r.id}`} onClick={() => setSearch("")}>
                      {r.title.length > 29
                        ? `${r.title.substring(0, 56)}...`
                        : r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

         

          {/**BUTTON CART */}
          <div
            className={`${
              isOpen && "hidden"
            } md:inline-block dropdown dropdown-end sm:ml-2 tooltip tooltip-left`}
            data-tip="Carrito de compras"
          >
            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {state.length > 0 && (
                  <span className="badge badge-primary indicator-item">
                    {state.length}
                  </span>
                )}
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold md:text-lg">
                  {state.length} Artículo(s)
                </span>
                <span className="fondt-semibold mb-2">
                  Subtotal: S/{subtotal}
                </span>
                <div className="card-actions">
                  <button
                    className="btn btn-success btn-block btn-sm md:btn-md"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Ver Lista
                  </button>
                </div>
              </div>
            </div>
          </div>

           {/**BUTTON OPTIONS MOVIL */}
           <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
              <SlOptionsVertical className="h-4 w-4" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={handleClickSearch}>
                  <IoMdSearch /> Buscar
                </a>
              </li>
              <li>
                <a onClick={handleClickFilter}>
                  <VscFilter /> Filtrar
                </a>
              </li>
              {/* <li>
                <a onClick={() => setIsOpen(!isOpen)}>
                  <AiOutlineShoppingCart />
                  Ver Lista
                </a>
              </li> */}
            </ul>
          </div>

          {/**BUTTON DARKMODE */}
          <div
            className="tooltip tooltip-bottom hidden md:block"
            data-tip="Tema"
          >
            <div className="btn btn-circle btn-ghost ml-2">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" onClick={toggleDarkMode} />

                {/* sun icon */}
                <svg
                  className="swap-on fill-current w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-off fill-current w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/**DIALOG SEARCH PRODUCT */}
      <dialog id="modal_search" className="modal modal-top sm:modal-middle">
        <form method="dialog" className="modal-box bg-base-200">
          {/**BTN CLOSE DIALOG */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1">
            ✕
          </button>
          <div className="form-control mt-2 ">
            <label className="font-semibold -mt-4 mb-2">
              Buscador de artículos:
            </label>
            <div className="flex justify-center items-center px-2 ml-1 mt-2">
              <MdSearch className="-mr-10 z-10 text-gray-500" />
              <input
                ref={inputSearchRef}
                type="search"
                placeholder="Buscar..."
                className="input input-bordered input-sm  w-full md:w-auto ml-5 pl-6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/**RESULT BOX */}
            <div className="px-3 text-sm mt-3">
              <ul
                className={`p-2 shadow-lg menu dropdown-content z-[1] bg-base-100 rounded-b-md ${
                  search === "" && "hidden"
                }`}
              >
                {result.map((r, i) => (
                  <li key={i}>
                    <Link to={`/product/${r.id}`} onClick={handleDialogSearch}>
                      {r.title.length > 29
                        ? `${r.title.substring(0, 29)}...`
                        : r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </dialog>

      {/**DIALOG FILTER PRODUCT */}
      <dialog id="modal_filter" className="modal modal-top sm:modal-middle">
        <form method="dialog" className="modal-box bg-base-200">
          {/**BTN CLOSE DIALOG */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h2 className="font-medium uppercase text-center">Filtros de Busqueda</h2>
          <hr />
          {/* SELECT CATEGORY INPUT */}
          <div className="form-control mt-2 ">
            <label className="label">
              <span className="label-text">Categoría:</span>
            </label>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              //defaultValue="selected"
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

          {/**PRICE RANGE */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Precio:</span>
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

          {/**RATING */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rating:</span>
            </label>
            <div className="rating">
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
          <div className="modal-action justify-center">
            <label
              htmlFor="my_modal_6"
              className="btn btn-sm btn-primary normal-case"
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
            </label>
            <label
              htmlFor="my_modal_6"
              className="btn btn-sm btn-ghost normal-case"
              onClick={handleCleanFilter}
            >
              Limpiar
            </label>
            <button className="btn btn-sm btn-ghost normal-case">Cerrar</button>
          </div>
          {/* <div className="flex justify-center">
          <button className="btn ">Aplicar</button>
          <button className="btn ">Cerrar</button>
          </div> */}
        </form>
      </dialog>

      {/**TOAST ADDED PRODUCT*/}
    </nav>
  );
};

export default NavBar;
