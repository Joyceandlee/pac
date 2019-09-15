const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');

const app = new express();

app.get('/', function (req, res, next) {
    // 博客园
    superagent.get('https://www.cnblogs.com/')
        .end(function (err, sres) {
            if (err) return err;
            var items = [];
            let $ = cheerio.load(sres.text);
            $('#post_list .post_item').each(function (index, element) {
                let $title = $(element).find('.post_item_body h3 a');
                let $autor = $(element).find('.post_item_foot .lightblue');
                items.push({
                    autor: $autor.text(),
                    title: $title.text(),
                    href: $title.attr('href')
                })
            })
            res.send(items);
            fs.writeFileSync('./bokeyuan.json', JSON.stringify(items))
        })
        
    // superagent.get('https://cnodejs.org/')
    // .end(function(err, sres) {
    //     if (err) return err;
    //     var items = [];
    //     // sres.text 网页的 html 内容 将它传给 cheerio.load，命名为 `$`
    //     var $ = cheerio.load(sres.text);
    //     //找到目标数据所在的页面元素，获取数据  each:遍历所有匹配的dom元素
    //     $('#topic_list .cell').each(function(index, element) {
    //         var $img = $(element).find('img');
    //         var $topic = $(element).find('.topic_title');
    //         items.push({
    //             author: $img.attr('title'),
    //             title: $topic.attr('title'),
    //             href: $topic.attr('href')
    //         });
    //     });
    //     res.send(items);
    //     fs.writeFileSync('./data.json',JSON.stringify(items))
    // });
})

app.listen(3000, () => {
    console.log("server is running at 3000")
})