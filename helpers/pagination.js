
module.exports = (objectPagination, query, countTasks) => {
    if(query.page) objectPagination.currentPage = parseInt(query.page) // lấy trang hiện tại trên query

    const totalPage = Math.ceil(countTasks / objectPagination.limitItem)
    objectPagination.totalPage = totalPage 
    return objectPagination
}