import { useState } from "react";
import catData from "../../cats/catData";
import "./Cats.css";

function Cats() {
  const [selectedCats, setSelectedCats] = useState([]);

  const toggleSelect = (catId) => {
    setSelectedCats((prevSelectedCats) => {
      if (prevSelectedCats.includes(catId)) {
        return prevSelectedCats.filter((id) => id !== catId);
      } else {
        return [...prevSelectedCats, catId];
      }
    });
  };

  const checkClowder = () => {
    if (selectedCats.length !== 3) {
      alert("Please select 3 cats to form a clowder.");
      return;
    }

    const catCodes = selectedCats.map((catId) => {
      const cat = catData.find((c) => c.id === catId);
      return `${cat.stripes}${cat.color}${cat.shape}${cat.eyes}`;
    });

    if (isValidClowder(catCodes)) {
      alert("Valid clowder!");
    } else {
      alert("Invalid clowder. Please select cats that get along.");
    }
  };

  const isValidClowder = (catCodes) => {
    const attributes = ["stripes", "color", "shape", "eyes"];
    for (let i = 0; i < attributes.length; i++) {
      const attributeValues = catCodes.map((code) => code[i]);
      if (!hasSameOrDifferentValues(attributeValues)) {
        return false;
      }
    }
    return true;
  };

  const hasSameOrDifferentValues = (arr) => {
    return (
      arr.every((val) => val === arr[0]) || new Set(arr).size === arr.length
    );
  };
  return (
    <div>
      <h1>Cat Clowder Selection</h1>
      <button onClick={checkClowder}>Check Clowder</button>
      <div className="container">
        <ul className="cats-cloud">
          {catData.map((cat) => (
            <li key={cat.id} className="cat-container">
              <figure
                className={`cat ${
                  selectedCats.includes(cat.id) ? "selected" : ""
                }`}
                onClick={() => toggleSelect(cat.id)}
              >
                <img
                  src={cat.imageUrl}
                  className="cat-img"
                  alt={`Cat ${cat.id}`}
                />
                <p className="cat-info">{cat.description}</p>
              </figure>
            </li>
          ))}
        </ul>
        <div className="clouders-found"></div>
      </div>
    </div>
  );
}

export default Cats;
