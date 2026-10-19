
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const h = React.createElement;

function App() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const loadCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/customers"
      );
      setCustomers(response.data);
    } catch (error) {
      setMessage("Backend connection failed. Check server and database.");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const addCustomer = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/customers", {
        full_name: name,
        phone: phone,
        email: email,
      });

      setName("");
      setPhone("");
      setEmail("");
      setMessage("Customer added successfully!");
      await loadCustomers();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to add customer."
      );
    }
  };

  return h(
    "div",
    { className: "container" },
    h("h1", null, "CRM Customer Management"),
    h(
      "form",
      { onSubmit: addCustomer },
      h("input", {
        placeholder: "Full Name",
        value: name,
        onChange: (event) => setName(event.target.value),
        required: true,
      }),
      h("input", {
        placeholder: "Phone",
        value: phone,
        onChange: (event) => setPhone(event.target.value),
        required: true,
      }),
      h("input", {
        placeholder: "Email",
        type: "email",
        value: email,
        onChange: (event) => setEmail(event.target.value),
        required: true,
      }),
      h("button", { type: "submit" }, "Add Customer")
    ),
    h("p", { role: "status" }, message),
    h("h2", null, "Customer List"),
    h(
      "ul",
      null,
      ...customers.map((customer) =>
        h(
          "li",
          { key: customer.customer_id },
          `${customer.full_name} | ${customer.phone} | ${customer.email}`
        )
      )
    )
  );
}

export default App;
