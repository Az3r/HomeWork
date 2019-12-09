const toolModel = require('./toolGetNameFromCode');
const getNameTool = new toolModel();

class queyTool
{
    

    customQueyString(firstParam, secondParam, thirdParam, sortParam)
    {
        let output = 'SELECT * FROM product';
        let existOneParam = 0;
        

        if(firstParam !== undefined || secondParam !== undefined || thirdParam !== undefined)
            output += ' WHERE (';

        if(firstParam !== undefined)
        {
           output += "tag = '" + getNameTool.getProductTypeFromCode(parseInt(firstParam)) + "'";
           existOneParam = 1;
        }

        if(secondParam !== undefined)
        {
            if(existOneParam)
                output += " AND ";
            output += "brand = '" + getNameTool.getBrandNameFromCode(parseInt(secondParam)) + "'";
            existOneParam = 1;
        }

        if(thirdParam !== undefined)
        {
            if(existOneParam)
                output += " AND ";
            output += "catalog = '" + getNameTool.getCatalogNameFromCode(parseInt(thirdParam)) + "'"; 
            existOneParam = 1;           
        }

        if(existOneParam)
            output += ")";

        if(sortParam !== undefined)
            output += " ORDER BY " + getNameTool.getSortNameFromCode(parseInt(sortParam));
       
        return output;
    }
}

module.exports = queyTool;