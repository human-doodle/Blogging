import { Users, db, Articles,Tags } from '../models/index.js';
import slug from 'slug';

//List Articles

async function returnArticles(luser, query){
    // console.log(query)
    // console.log()
    var limit = 20;
    var offset = 0;
    console.log(typeof query.tag)
    if(typeof query.limit != 'undefined'){
      limit = Number(query.limit);
    }
  
    if(typeof query.offset != 'undefined'){
      offset = Number(query.offset);
    //   console.log("......................")
    //   console.log(offset)
    }
console.log(query.offset)
    //incase tag filter
    var whereCondition = {};
    if( typeof query.tag != 'undefined' ){
        console.log(query.tag)
    whereCondition['tag'] = {name : query.tag}
    }
    console.log(whereCondition.tag)
  
    //incase author filter
    if( typeof query.author != 'undefined' ){
        console.log(query.author)
    whereCondition['author'] = {username : query.favorited}
    }

    //incase favourites filter
    if( typeof query.favourited != 'undefined' ){
        console.log(query.favourited)
    whereCondition['favourited'] = {username : query.favourited}
    }
    console.log(whereCondition.tag)
    console.log(whereCondition.author)
    console.log(whereCondition.favourited)

        const articles = await Articles.findAll({
        attributes: ['slug', 'title', 'description', 'body', 'createdAt', 'updatedAt', 'authorUsername'],
        limit: limit,
         offset : offset,
          order: [['updatedAt', 'DESC']],
        include: [
            { 
              model: Tags, 
              through : 'article_tags',
              
            where:
            //  { 
                whereCondition.tag
                
            //   } 
            },
            {   attributes: ['username'],
        
                model : Users,
                through : 'Favourites',
                where : 
                whereCondition.favorited
            },
            {   attributes: ['username','bio','image'],
        
                model : Users,
                as: 'author',
                include :{
                    model : Users,
                    through : 'follow_table',
                    as: 'Following',
                },
                where : whereCondition.author
                
                
            },
            
        ],
        required: true,
         });
    //   console.log(articles)
         articles.forEach(element => {

            //  set the tagList
            var temp = []
            element.dataValues.tags.forEach(e=>temp.push(e.name));
            element.dataValues["tagList"] = temp
            console.log(element.dataValues["tagList"])

            // set favourites and number of favouritesCount
            var fCount= 0
            var f = false
            element.dataValues.users.forEach(e =>{ fCount = fCount+1;if(luser==e.username){f = true}})
            element.dataValues["favourited"]= f
            element.dataValues["favouritesCount"]= fCount

            // set author information and following
            var follow = false 
            element.dataValues.author['Following'].forEach(e =>{if(luser==e.username){follow = true}})
            element.dataValues.author = {
                "username": element.dataValues.author.username,
                "bio": element.dataValues.author.bio,
                "image": element.dataValues.author.image,
                "following" : follow
            }

            // delete unwanted elements
            delete element.dataValues.users;
            delete element.dataValues.tags;
            delete element.dataValues.authorUsername;
          }); 
      
      const retarticles = { 
        articles
      }
    
return retarticles;
}

async function feedArticles(luser){
    
    const c = await returnArticles(luser, {})
    const articles = []
    c.articles.forEach(element => {
        if(element.dataValues.author.following == true){
            articles.push(element)
        }
    })
    console.log(articles)
    return articles
}

async function getArticles(luser,id){
    console.log(id)
    const articles = await Articles.findOne({
        attributes: ['slug', 'title', 'description', 'body', 'createdAt', 'updatedAt', 'authorUsername'],
        where : {
            slug : id.slug
        } ,
        include: [
            { 
              model: Tags, 
              through : 'article_tags',
            },
            {   attributes: ['username'],
        
                model : Users,
                through : 'Favourites',
                
            },
            {   attributes: ['username','bio','image'],
        
                model : Users,
                as: 'author',
                include :{
                    model : Users,
                    through : 'follow_table',
                    as: 'Following',
                },
                
               
            },
            
        ],
        required: true,
         });

            //  set the tagList
            var temp = []
            articles.dataValues.tags.forEach(e=>temp.push(e.name));
            articles.dataValues["tagList"] = temp
            console.log(articles.dataValues["tagList"])

            // set favourites and number of favouritesCount
            var fCount= 0
            var f = false
            articles.dataValues.users.forEach(e =>{ fCount = fCount+1;if(luser==e.username){f = true}})
            articles.dataValues["favourited"]= f
            articles.dataValues["favouritesCount"]= fCount

            // set author information and following
            var follow = false 
            articles.dataValues.author['Following'].forEach(e =>{if(luser==e.username){follow = true}})
            articles.dataValues.author = {
                "username": articles.dataValues.author.username,
                "bio": articles.dataValues.author.bio,
                "image": articles.dataValues.author.image,
                "following" : follow
            }

            // delete unwanted articles
            delete articles.dataValues.users;
            delete articles.dataValues.tags;
            delete articles.dataValues.authorUsername;
          
      
      const retarticles = { 
        articles
      }

         return retarticles
}

async function createArticles(luser,useropts){
 const s = slug(useropts.title);
 console.log(s)
 
 const art = await Articles.findOrCreate({
    where: {slug : s},
   defaults : {slug: s ,
       ... useropts,
       createdAt : Date.now(),
       updatedAt: Date.now(),
       authorUsername: luser,
       userUsername : luser,
   }
 });

 if(typeof useropts.tagList != 'undefined'){

for (const element of useropts.tagList) 
    {
    const tagg = await Tags.findOrCreate({
        where: {name : element},
        defaults: {name : element,
        createdAt : Date.now(),
        updatedAt: Date.now()
  }
});
console.log(element)

const art_tags = await db.query(
    'INSERT INTO article_tags VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, :a, :b );',
      {
        replacements:{ a: s,
        b: element},
        
      })
}
}
return {slug : s}

}

export{
    returnArticles,
    feedArticles,
    getArticles,
    createArticles,
}