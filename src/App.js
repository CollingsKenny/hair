import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import csv from 'csv';
import * as FileSaver from 'file-saver';

function App() {
  const [orders, setOrders] = useState(null);
  const [hairTypes, setHairTypes] = useState(null);
  const [output, setOutput] = useState(null);

  const csvOptions = {
    bom: true,
    columns: true,
  };

  const getProductOption = (hairType) => {
    if (hairType) {
      const long = hairType['Hair Length'] === 'long' ? 'long' : '';
      const formula = hairType['Hair Type'];
      if (formula === 'ultra') {
        return long + formula;
      }
      return formula;
    }

    return 'none';
  };

  const onOrdersChange = (file) => {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      csv.parse(fileReader.result, csvOptions, (err, data) => {
        setOrders(data);
        //setOrders(mapReduce(data));
      });
    };
    fileReader.readAsBinaryString(file);
  };

  const onHairChange = (file) => {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      csv.parse(fileReader.result, csvOptions, (err, data) => {
        setHairTypes(data);
        //setOrders(mapReduce(data));
      });
    };
    fileReader.readAsBinaryString(file);
  };

  const addHairToOrders = () => {
    setOutput(
      orders.map((order) => {
        return {
          ...order,
          itemOptions: getProductOption(
            hairTypes.find(
              (hairType) => hairType['Order Number'] == order['ï»¿Order #']
            )
          ),
        };
      })
    );
  };

  const onOutput = () => {
    csv.stringify(
      output,
      { header: true, columns: Object.keys(output[0]) },
      (err, data) => {
        console.log(data);
        FileSaver.saveAs(
          new Blob([data], {
            type: 'text/csv;charset=utf-8',
          }),
          'output.csv'
        );
      }
    );
  };

  const mapReduce = (data) => {
    let keys = data.shift();
    return data.map((row) => {
      return keys.reduce((obj, key, i) => {
        obj[key] = row[i];
        return obj;
      }, {});
    });
  };

  return (
    <div className='App'>
      <div>
        <h2 onClick={(e) => console.log(orders)}>Orders</h2>
        <input
          type='file'
          id='file'
          accept='.csv'
          onChange={(e) => onOrdersChange(e.target.files[0])}
        />
      </div>
      <div>
        <h2 onClick={(e) => console.log(hairTypes)}>Hair_type</h2>
        <input
          type='file'
          id='file'
          accept='.csv'
          onChange={(e) => onHairChange(e.target.files[0])}
        />
      </div>
      <button onClick={(e) => addHairToOrders()}>Add Hair to Orders</button>
      <button onClick={(e) => onOutput()}>Output</button>
      <button onClick={(e) => console.log(output)}> View Output</button>

      <button onClick={(e) => console.log(hairTypes[0]['Order Number'])}>
        test hair types id
      </button>
      <button onClick={(e) => console.log(orders[0]['ï»¿Order #'])}>
        test order id
      </button>
    </div>
  );
}

export default App;
