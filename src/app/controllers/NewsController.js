
class NewsController {
    index(req, res)
    {
        // GET /news
        res.render('news');
    }
}

module.exports = new NewsController;
