module.exports = function()
{
    let activeCode = Math.floor(Math.random()  * 10).toString();
    for(let i = 0; i < 7; i++)
        activeCode += Math.floor(Math.random()  * 10).toString();
    
    return activeCode;
}