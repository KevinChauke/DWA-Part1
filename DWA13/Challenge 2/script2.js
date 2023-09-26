const products = [
    {
      product: 'banana',
      price: "2"
    },
  
    {
      product: 'mango',
      price: 6
    },
  
    {
      product: 'potato',
      price: ' '
    },
  
    {
      product: 'avocado',
      price: "8"
    },
  
    {
      product: 'coffee',
      price: 10
    },
  
    {
      product: 'tea',
      price: ''
    },
  ];
  
  /** 
  * Use forEach to console.log each product name to the console.
  */
  const productName = products.forEach(product => console.log(product.product));
  
  
  /** 
  *  Use filter to filter out products that have a name longer than 5 characters
  *  calcs the combined price of all remaining products
  */
  const longerThan5 = products.filter((product) => product.product.length <= 5)
  
  
  
  /**
  * Filters out products that do not have prices or have prices that is not a number,
  * and convert the price from string to number 
  */
  const filter = products
    .filter((product) => product.price !== '' && !isNaN(product.price))
    .map(product => ({ ...product, price: Number(product.price) }))  //converts price to number.
    .reduce((total, product) => total + product.price, 0);
  
  
  /**
  * concats all product names 
  */
  const concat = products.reduce((names, product) => names + ", " + product.product, "");
  
  
  /**
  * Use reduce to calculate both the highest and lowest-priced items. 
  */
  const { highestProduct, lowestProduct } = products.reduce(
    (acc, product) => {
      if (product.price > acc.highestPrice) {
        acc.highestPrice = product.price;
        acc.highestProduct = product.product;
      }
      if (product.price < acc.lowestPrice) {
        acc.lowestPrice = product.price;
        acc.lowestProduct = product.product;
      }
      return acc;
    },
    { highestPrice: -Infinity, lowestPrice: Infinity }
  );
  
  
  const modObj = products.reduce((acc, item) => {
    const modifiedItem = Object.entries(item).reduce((obj, [key, value]) => {
      if (key === 'product') {
        obj.name = value;
      } else if (key === 'price') {
        obj.cost = value;
      } else {
        obj[key] = value;
      }
      return obj;
    }, {});
    acc.push(modifiedItem);
    return acc;
  }, []);
  
  
  console.log(
    longerThan5,
    filter,
    concat,
    { highestProduct, lowestProduct },
    modObj
  );
  