import { useState, useEffect } from "react";
export default function Shop() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [disable, setDisable] = useState(false);
  const [selected, setSelected] = useState(false);
  const [numberPage, setNumberPage] = useState(1);
  const handleSearch = (e) => {
    setNumberPage(1);
    setSearch(e.target.parentElement.querySelector("input").value);
    console.log(e.target.parentElement.querySelector("input").value);
  };
  const handleNumberPage = (e) => {
    setNumberPage(e.target.value);
    setSkip((e.target.value - 1) * limit);
  };
  useEffect(() => {
    if (search === "") {
      setDisable(false);
      setSelected(false);
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          setTotalPage(data.total);
        });
      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        });
    } else {
      setDisable(true);
      setSelected(true);
      fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setSkip(0);
          setTotalPage(1);
          setProducts(data.products);
        });
    }
  }, [skip, limit, search, numberPage]);
  const handleSelectLimit = (e) => {
    console.log(e.target.value);

    setLimit(e.target.value);
    setSkip(0);
    setNumberPage(1);
  };
  return (
    <div className="px-10">
      <h2 className="text-3xl text-center py-10">Danh sach sản phẩm</h2>
      <div className="flex justify-center gap-6 py-4">
        <div className="flex items-center">
          <input className="border p-2" type="text" />
          <button
            onClick={(e) => {
              handleSearch(e);
            }}
            className="fa-solid fa-magnifying-glass p-3 border"
          ></button>
        </div>
        <select
          disabled={disable}
          className="border p-2"
          onChange={(e) => handleSelectLimit(e)}
        >
          <option value={10}>Hiển thị 10 sản phẩm</option>
          <option value={20}>Hiển thị 20 sản phẩm</option>
          <option value={30}>Hiển thị 30 sản phẩm</option>
          <option value={40}>Hiển thị 40 sản phẩm</option>
          <option selected={selected} value={200}>
            Hiển thị tất cả sản phẩm
          </option>
        </select>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {products.map((item) => (
          <div className="border" key={item.id}>
            <h3>{item.title}</h3>
            <img src={item.thumbnail} alt="" />
            <p>Giá : {item.price}</p>
          </div>
        ))}
      </div>

      <button
        className="w-20 h-10 border-2"
        onClick={() => {
          if (numberPage > 1) {
            setSkip(numberPage * limit);
            setNumberPage(numberPage - 1);
          }
        }}
      >
        Previous
      </button>
      <span className="mx-4">
        <input
          disabled={selected}
          onChange={(e) => {
            handleNumberPage(e);
          }}
          className="border px-2 py-1 w-12"
          type="number"
          value={numberPage}
        />
        <span>/ {Math.floor(totalPage / limit) + 1}</span>
      </span>
      <button
        className="w-20 h-10 border-2"
        onClick={() => {
          if (numberPage + 1 < totalPage) {
            setSkip(numberPage * limit);
            setNumberPage(numberPage + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
}
