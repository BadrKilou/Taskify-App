import React, { Fragment } from "react";
import './styles/SearchBox.scss';
import { BsSearch } from 'react-icons/bs'
const SearchBox = () => {
  return (
    <Fragment>
      <div class="searchBox">

<input class="searchInput"type="text" name="" placeholder="Search" />
<button class="searchButton" href="#">
        <BsSearch size={20} />
   
</button>
</div>
    </Fragment>
  );
};

export default SearchBox;
