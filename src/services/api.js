export const getProduct = async(id) => { 
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    //console.log(data);
    return data;
 }