class tool
{
    getProductTypeFromCode(index)
    {
      let output;
      switch(index)
      {
        case 1:
          output = 'Mắt kính';
          break;
        case 2:
          output = 'Vest';
          break;
        case 3:
          output = 'Mũ nón';
          break;
        case 4:
          output = 'Trang sức';
          break;
        case 5:
          output = 'Quần áo';
          break;
        case 6:
          output = 'Túi xách';
          break;
        case 7:
          output = 'Giày';
          break;
        default:
          break;
      }

      return output;
    }

    getBrandNameFromCode(index)
    {
        let output;
        switch(index)
        {
          case 1:
            output = 'Việt tiến';
            break;
          case 2:
            output = 'owen';
            break;
          case 3:
            output = '5 the way';
            break;
          case 4:
            output = '4men';
            break;
          case 5:
            output = 'juno';
            break;
          case 6:
            output = 'bwm';
            break;
          default:
            break;
        }
  
        return output;
    }

    
    getCatalogNameFromCode(index)
    {
        let output;
        switch(index)
        {
          case 1:
            output = 'thời trang nam';
            break;
          case 2:
            output = 'thời trang nữ';
            break;
          case 3:
            output = 'trẻ em';
            break;
          default:
            break;
        }
  
        return output;
    }

    getSortNameFromCode(index)
    {
      
      switch(index)
      {
        case 2:
          return "price DESC";
          break;
        case 3:
          return "price ASC";
          break;
        default:
          break;
      }
      return;
    }
}

module.exports = tool;