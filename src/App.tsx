// App.tsx

import React, { useState, useEffect } from "react";
import "./App.css";
import CustomerDetails  from './Components/CustomerDetails';
import CustomerList from './Components/CustomerList';
import { Heading } from './Components/Heading';
import { Customer } from './Components/types';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch customer list from API
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const formattedCustomers = data.results.map((result: any) => ({
          id: result.login.uuid,
          name: `${result.name.first} ${result.name.last}`,
          title: result.name.title,
          address: `${result.location.street.number} ${result.location.street.name}, ${result.location.city}, ${result.location.state}, ${result.location.country}, ${result.location.postcode}`,
          photos: [result.picture.large, result.picture.medium, result.picture.thumbnail]
        }));
        setCustomers(formattedCustomers);
        setSelectedCustomerId(formattedCustomers[0].id);
      })
      .catch((error) => console.log("Error fetching customers: ", error));
  }, []);

  const handleCustomerClick = (customerId: string) => {
    setSelectedCustomerId(customerId);
  };

  const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId) || null;

  return (
    <div className="App">
      <Heading />
      <div className="main-content">
        <CustomerList
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onCustomerClick={handleCustomerClick}
        />
        <CustomerDetails customer={selectedCustomer} />
      </div>
    </div>
  );
};

export default App;
