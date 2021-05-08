const Search = (column, keyword, list) => {
    if (column === "contents[0].name")  
      return list.filter((item) =>
        (item.contents[0].name ?? ``).toLowerCase().includes((keyword ?? ``).toLowerCase())
      );
  
    return list.filter((item) =>
      (item[column] ?? ``).toLowerCase().includes((keyword ?? ``).toLowerCase())
    );
  };
  
  export default Search;