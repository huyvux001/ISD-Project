// TEST FUNCTION TODO

const generateCustomId = async (customerType, date) => {
    const typeAbbreviation = customerType === 'Personal' ? 'CN' : customerType === 'Enterprise' ? 'DN' : 'NONE';
    //query lay dbs lay stt trong ngay

    // Day, month, year have 2 digits long "0" if necessary
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Define code
    const prefix = `${typeAbbreviation} //stt ${day}${month}${year}`;
    console.log(prefix)

    // Query 
    const query = "SELECT COUNT(*) FROM customers WHERE customer_id LIKE";
    
};

generateCustomId('Enter', new Date('2021-01-01'));