/* eslint-disable react/prop-types */
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query.trim());
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Characters"
                            aria-label="Search Characters"
                            aria-describedby="search-button"
                            value={query}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="search-button"
                            style={{
                                color: "#fff",
                                backgroundColor: "#804df7",
                            }}
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
