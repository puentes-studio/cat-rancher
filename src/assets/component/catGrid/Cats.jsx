import { useState } from "react";
import catData from "../../cats/catData";
import "./Cats.css";

function Cats() {
  const [selectedCats, setSelectedCats] = useState([]);
  const [clowder, setClowder] = useState([]);

  const toggleSelect = (catId) => {
    setSelectedCats((prevSelectedCats) => {
      if (prevSelectedCats.includes(catId)) {
        return prevSelectedCats.filter((id) => id !== catId);
      } else {
        return [...prevSelectedCats, catId];
      }
    });
  };
  console.log(selectedCats);

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
      setClowder(selectedCats); // Update clowder state with selected cats
      alert("Valid clowder!");
    } else {
      alert("Invalid clowder. Please select cats that get along.");
    }
  };

  const isValidClowder = (catCodes) => {
    // Three tall cats will get along; a tall, a short, and a round cat will get along; but if you put two tall cats and one short cat in clowder, there will be cat fights.
    const tallCats = catCodes.filter((code) => code[0] === "3").length;
    const shortCats = catCodes.filter((code) => code[0] === "1").length;
    const roundCats = catCodes.filter((code) => code[2] === "r").length;

    if (
      tallCats === 3 ||
      (tallCats === 1 && shortCats === 1 && roundCats === 1)
    ) {
      return true; // Three tall cats will get along - a tall, a short, and a round cat will get along;
    }

    // Verificar regla para evitar peleas entre los gatos
    if (tallCats === 2 && shortCats === 1) {
      return false; // two tall cats and one short cat will fight
    }

    // check each attribute
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
        <ul className="cats-container">
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
        <div>
          <h2>Clowders Found</h2>
          <div className="clouders-found">
            <ul className="cats-container">
              {clowder.length > 0 &&
                clowder.map((catId) => {
                  const cat = catData.find((c) => c.id === catId);
                  return (
                    <li key={cat.id} className="cat-container">
                      <figure className="cat">
                        <img
                          src={cat.imageUrl}
                          className="cat-img"
                          alt={`Cat ${cat.id}`}
                        />
                      </figure>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cats;
