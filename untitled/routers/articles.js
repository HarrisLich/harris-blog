const express = require('express')
const router = express.Router()
const isAuth = require('../authMiddleware').isAuth
const Article = require('../models/article')

router.get('/', async (req,res)=>{
    let articles = await Article.find().sort({createdAt: 'desc'})
    if(req.isAuthenticated()){
        res.render("articlesAdmin", {articles: articles, page_name: "articles"})
    }else{ res.render("articles", {articles: articles, page_name: "articles"}) }
    
})

router.get('/new', isAuth, (req,res)=>{
    res.render('newArticle', { article: new Article() })
})

router.post('/new', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('articles/new'))

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    if (req.isAuthenticated()){
        res.render('showAdmin', {article: article})
    }else{
        res.render('show', { article: article })
    }
})

router.get('/edit/:id', isAuth, async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('edit', { article: article })
})

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', isAuth, async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`${article.slug}`)
        } catch (e) {
            res.render(`${path}`, { article: article })
        }
    }
}

module.exports = router