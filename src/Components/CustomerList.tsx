import React from "react";
import { Customer } from './types';

type Props = {
  customers: Customer[];
  selectedCustomerId: string | null;
  onCustomerClick: (customerId: string) => void;
};

const CustomerList: React.FC<Props> = ({ customers, selectedCustomerId, onCustomerClick }) => {
  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`customer-card ${selectedCustomerId === customer.id ? "selected-customer" : ""}`}
          onClick={() => onCustomerClick(customer.id)}
        >
          <h3>{customer.title}. {customer.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
