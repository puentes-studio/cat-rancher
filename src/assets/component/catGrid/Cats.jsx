import { useState } from "react";
import AlertModal from "../alerts/Alert";
import catData from "../../cats/catData";
import "./Cats.css";

function Cats() {
  const [selectedCats, setSelectedCats] = useState([]);
  const [clowder, setClowder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
      setAlertMessage("Please select 3 cats to form a clowder.");
      setIsOpen(true);
      return;
    }
    console.log("Please select 3 cats to form a clowder.");

    const catCodes = selectedCats.map((catId) => {
      const cat = catData.find((c) => c.id === catId);
      return `${cat.stripes}${cat.color}${cat.shape}${cat.eyes}`;
    });

    if (isValidClowder(catCodes)) {
      setClowder(selectedCats);
      setAlertMessage("Valid clowder!");
      setIsOpen(true);
    } else {
      setAlertMessage("Invalid clowder. Please select cats that get along.");
      setIsOpen(true);
    }
  };
  const isValidClowder = (catCodes) => {
    // Three tall cats will get along; a tall, a short, and a round cat will get along; but if you put two tall cats and one short cat in clowder, there will be cat fights.
    const tallCats = catCodes.filter((code) => code[0] === "3").length;
    const shortCats = catCodes.filter((code) => code[0] === "1").length;
    const roundCats = catCodes.filter((code) => code[2] === "r").length;

    if (
      tallCats === 3 || // Three tall cats will get along
      (tallCats === 1 && shortCats === 1 && roundCats === 1) // One tall, one short, and one round cat will get along but not all combinations...
    ) {
      return true;
    }

    // Two tall cats and one short cat will fight
    if (tallCats === 2 && shortCats === 1) {
      return false;
    }

    // Check each attribute
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

  const resetSelection = () => {
    setSelectedCats([]);
    setClowder([]);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1 className="cat-title">Cat Clowder Selection</h1>
      <p className="cat-description">
        Hello! please select 3 cats to form a clowder, you can select and
        unselect a cat. <br />
        Once selected a clowder (a group of 3 cats), we will check if you made a
        valid clowder.
      </p>
      <button className="check-button" onClick={checkClowder}>
        Check Clowder
      </button>
      <button className="reset-button" onClick={resetSelection}>
        Reset Selection
      </button>
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
            <ul className="result-container">
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
      <AlertModal isOpen={isOpen} message={alertMessage} onClose={closeModal} />
    </div>
  );
}

export default Cats;
