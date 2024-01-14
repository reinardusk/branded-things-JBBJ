import OptionsBar from "../components/OptionsBar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { Outlet } from "react-router-dom";
import loadingGif from "../components/assets/shigure-goddess.gif";
import Navbar from "../components/Navbar";

export default function PublicHomePage() {
  const url = "https://phase2-aio.vercel.app";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("ASC");
  const [pagination, setPagination] = useState({ totalPage: 10 });
  // page min. = 1 || max = totalPage && limit min. = 4 || max. = 12
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  async function fetchProducts() {
    try {
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products?q=${search}&i=${filter}&sort=${sort}&page=${page}&limit=${limit}`
      );
      setProducts(data.data.query);
      setPagination(data.data.pagination);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/categories`
      );

      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }

  function searchOnChange(event) {
    let newSearch = event.target.value;
    console.log(newSearch);
    setSearch(newSearch);
  }

  function filterOnChange(event) {
    let newFilter = event.target.value;
    setFilter(newFilter);
  }

  function sortOnChange(event) {
    // console.log(event);
    let newSort = event.target.value;
    setSort(newSort);
  }

  // PAGE
  function nextPage(event) {
    if (page < pagination.totalPage) {
      setPage(page + 1);
    }
  }

  function previousPage(event) {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function limitOnChange(event) {
    let newLimit = event.target.value;
    setLimit(newLimit);
  }
  // ----PAGE

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, filter, sort, page, limit]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <img src={loadingGif} />
          <p className="font-bold text-xl">Goyang dulu, selagi bisa...</p>
        </div>
      ) : (
        <section
          className="w-full h-full min-h-screen bg-gray-900 pt-20"
          id="PublicHomePageSection"
        >
          <div>
            <img src="" alt="" className="w-full" />
          </div>
          <div className="optionsBar"></div>

          <OptionsBar
            categories={categories}
            searchOnChange={searchOnChange}
            filterOnChange={filterOnChange}
            sortOnChange={sortOnChange}
            limitOnChange={limitOnChange}
          />

          <div className="cardContainer grid grid-cols-4 gap-2 p-3">
            {products.map((product) => {
              return <Card product={product} key={product.id} />;
            })}
          </div>

          <Pagination
            nextPage={nextPage}
            previousPage={previousPage}
            page={page}
            pagination={pagination}
          />
        </section>
      )}
    </>
  );
}
