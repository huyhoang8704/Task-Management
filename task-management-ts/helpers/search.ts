const searchHelpers = (req, find) =>{
    let keyword = "";
    if(req.query.keyword){
        keyword = req.query.keyword

        const regex = new RegExp(keyword , "i")

        find["title"] = regex // gán title vô trong find 
    }
    return keyword
}

export default searchHelpers;