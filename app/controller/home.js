'use strict';

const Controller = require('egg').Controller;
const superagent = require('superagent');
const cheerio = require('cheerio');

class HomeController extends Controller {
  async index(ctx) {
    let res = await superagent.get('https://cnodejs.org/')

    let items = [];
    let $ = cheerio.load(res.text);

    $('#topic_list .cell').each((index, element) => {
      let $topic = $(element).find('.topic_title');
      let $img = $(element).find('img');

      items.push({
        topic: $topic.attr('title'),
        autor: $img.attr('title'),
        href: $topic.attr('href')
      })
    })
    return items;
  }

  async getdata(ctx) {
    let arr = await this.index();
    console.log(arr)
    ctx.body = {
      code: 1,
      arr
    }
  }
}

module.exports = HomeController;
