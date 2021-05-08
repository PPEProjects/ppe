const Search = (column, keyword, list) => {
    return list.filter((item) => (item[column] ?? ``).toLowerCase().includes((keyword ?? ``).toLowerCase()))
}

export default Search