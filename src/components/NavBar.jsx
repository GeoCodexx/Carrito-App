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

const NavBar = () => {
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

  useEffect(() => {
    const getData = setTimeout(() => {
      setSearchWord(search);
    }, 1500);

    return () => clearTimeout(getData);
  }, [search]);

  /*const handleSubmit = () => {
    //console.log(search);
    search !== "" && setSearchWord(search);
  };*/

  const handleClickSearch = () => {
    window.modal_search.showModal();
    inputSearchRef.current.focus();
  };

  const handleClickFilter = () => {
    /*setCategoryFilter("selected");
    setPriceFilter(0);
    setRatingValue(0);*/
    window.modal_filter.showModal();
    //inputSearchRef.current.focus();
  };

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
    console.log("Rating:", event.target.value);
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
    navegar('/filteredproducts');
  };

  /**CLEAN FILTER OPTIONS */
  const handleCleanFilter = () => {
    //console.log("Limpiar filtro");
    setCategoryFilter("selected");
    setPriceFilter(0);
    setRatingValue(0);
  };

  // console.log(categoryFilter, priceFilter, ratingValue);
  //console.log(location);
  return (
    <nav className="shadow-lg fixed z-10 w-full">
      <div className="navbar bg-base-100">
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
              <li>
                <a>Inicio</a>
              </li>
              <li>
                <a>Ofertas</a>
              </li>
              <li>
                <a>Más Vendidos</a>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
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
          <div className="form-control hidden md:flex">
            <input
              type="search"
              placeholder="Buscar..."
              className="input input-bordered w-24 md:w-auto"
            />
          </div>

          {/**BUTTON OPTIONS MOVIL */}
          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
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
              <li>
                <a>
                  <AiOutlineShoppingCart onClick={() => setIsOpen(!isOpen)} />{" "}
                  Ver Carrito
                </a>
              </li>
            </ul>
          </div>

          {/**BUTTON CART */}
          <div
            className={`${
              isOpen && "hidden"
            } hidden md:flex dropdown dropdown-end sm:ml-2`}
          >
            <label tabIndex={0} className="btn btn-ghost btn-circle">
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
                <span className="font-bold text-lg">{state.length} Items</span>
                <span className="text-base">Subtotal: S/{subtotal}</span>
                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Ver carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/**DIALOG SEARCH PRODUCT */}
      <dialog id="modal_search" className="modal modal-top sm:modal-middle">
        <form method="dialog" className="modal-box">
          {/**BTN CLOSE DIALOG */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1">
            ✕
          </button>
          <div className="form-control mt-2 ">
            <div className="flex justify-center items-center px-2 ml-1">
              <MdSearch className="-mr-10 z-10 text-gray-500" />
              <input
                ref={inputSearchRef}
                type="search"
                placeholder="Buscar..."
                className="input input-bordered input-sm w-full md:w-auto ml-5 pl-6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/**RESULT BOX */}
            <div className="px-3 text-sm">
              <ul
                className={`p-2 shadow-lg menu dropdown-content z-[1] bg-base-100 rounded-b-md ${
                  search === "" && "hidden"
                }`}
              >
                {result.map((r, i) => (
                  <li key={i} className="">
                    <Link to={`/detail/${r.id}`}>
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
        <form method="dialog" className="modal-box">
          {/**BTN CLOSE DIALOG */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h2 className="font-medium">Filtros de Busqueda</h2>
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
              <option value="jewerly">Jewelery</option>
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
              className="btn btn-sm"
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
              className="btn btn-sm"
              onClick={handleCleanFilter}
            >
              Limpiar
            </label>
            <button className="btn btn-sm">Cerrar</button>
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
