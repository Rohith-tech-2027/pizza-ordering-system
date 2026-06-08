import { useState } from "react";
import axios from "axios";

function PizzaBuilder() {
  const [base, setBase] = useState("Thin Crust");
  const [sauce, setSauce] = useState("Tomato Sauce");
  const [cheese, setCheese] = useState("Mozzarella");
  const [veggies, setVeggies] = useState([]);

  const handleVeggies = (e) => {
    if (e.target.checked) {
      setVeggies([...veggies, e.target.value]);
    } else {
      setVeggies(veggies.filter((veg) => veg !== e.target.value));
    }
  };

  const placeOrder = async () => {
    console.log("Button Clicked");

    try {
      const response = await axios.post(
        "https://zoological-essence-production.up.railway.app/api/orders/place-order",
        {
          customerName: "Rohith",
          base,
          sauce,
          cheese,
          veggies,
        }
      );

      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.log("ERROR:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <h1>🍕 Build Your Pizza</h1>

      <h3>Select Base</h3>
      <select onChange={(e) => setBase(e.target.value)}>
        <option>Thin Crust</option>
        <option>Thick Crust</option>
        <option>Cheese Burst</option>
        <option>Whole Wheat</option>
        <option>Stuffed Crust</option>
      </select>

      <h3>Select Sauce</h3>
      <select onChange={(e) => setSauce(e.target.value)}>
        <option>Tomato Sauce</option>
        <option>BBQ Sauce</option>
        <option>White Sauce</option>
        <option>Pesto Sauce</option>
        <option>Spicy Sauce</option>
      </select>

      <h3>Select Cheese</h3>
      <select onChange={(e) => setCheese(e.target.value)}>
        <option>Mozzarella</option>
        <option>Cheddar</option>
        <option>Parmesan</option>
      </select>

      <h3>Select Veggies</h3>

      <input type="checkbox" value="Onion" onChange={handleVeggies} /> Onion <br />
      <input type="checkbox" value="Capsicum" onChange={handleVeggies} /> Capsicum <br />
      <input type="checkbox" value="Mushroom" onChange={handleVeggies} /> Mushroom <br />
      <input type="checkbox" value="Tomato" onChange={handleVeggies} /> Tomato <br />
      <input type="checkbox" value="Corn" onChange={handleVeggies} /> Corn <br /><br />

      <h2>Order Summary</h2>

      <p>Base: {base}</p>
      <p>Sauce: {sauce}</p>
      <p>Cheese: {cheese}</p>
      <p>Veggies: {veggies.join(", ")}</p>

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default PizzaBuilder;