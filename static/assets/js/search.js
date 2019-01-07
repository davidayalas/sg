var converter = new showdown.Converter();
converter.setOption('tables', true);

function replaceHighLight(content){
  var matches;

  do{
    matches = content.match(/\]\(.*?(<span class="highlight_hit">(.*?)<\/span>).*?\)/g);
    if(!matches){
        return content;
    }
    var highlight = /<span class="highlight_hit">(.*?)<\/span>/g;
    var highmatches;
    for(var i=0,z=matches.length;i<z;i++){
      highmatches = highlight.exec(matches[i]);
      if(highmatches)
      content = content.replace(matches[i], matches[i].replace(highmatches[0],highmatches[1]));
    }
  }while(matches!=null)

  return content;
}


/* global instantsearch */
app({
  appId: 'STCFX6MFXG',
  apiKey: '7e5bbfd198172dd34161605ddeecbe0d',
  indexName: 'web_sambo'
});

function app(opts) {
  var search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true,
    searchFunction : function(helper) {
      if (helper.state.query === '') {
        //return;
      }
      helper.search();
    }
  });

  /*search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#query',
      placeholder: 'Cerca....'
    })
  );*/

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      },
      transformData : function(item){
        var yt;
        if(item.images && item.images.length>0){
          item.image = item.images[0].image;
        }
        if(item.youtube){
          yt = item.youtube.split("/");
          yt = "https://www.youtube.com/embed/"+yt.pop();
          item.youtube = yt;
        }
        if(item.image || item.youtube){
          item.hasMedia = true;
        }
        return item;
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
      templates: {
        body: getTemplate('stats')
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '.footer_pagination',
      autoHideContainer: true,
      //scrollTo: '#query',
      showFirstLast : true,
      maxpages : 10,
      labels: {
        previous : "<",
        next : ">",
        first: "<<",
        last : ">>"
      },
      cssClasses : {
        root : "pagination",
        item : "page-item",
        link : "page-link",
        disabled : "disabled", 
        active: "active",
        first : "first",
        last : "last",
        page : ""
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '.tags ul.actions',
      attributeName: 'tags',
      autoHideContainer: true,
      limit: 10,
      operator: 'and',
      templates: {
        header: getHeader(),
        item: getTemplate('tag')
      },
      transformData : {
      }
    })
  )

  search.on("render", function(){

    if($(".pagination li span").length>0){
      $(".page_inserted").remove();
      $(".pagination li span").each(function(i, el){
        $('<a class="page-link">'+$(el).text()+'</a>').appendTo($(el).parent());
        $(el).css("display", "none");
      });
    }

    if($(".pagination li").length===5){
      $(".footer_pagination").css("display", "none");
    }

    //change images
    $("[data-src]").each(function(i, el){
      $.getJSON($(this).attr("data-src"), function( data ) {
        $("<img style='vertical-align: middle;' src='" + data.image + "' />").appendTo($(el).parent());
        $(el).remove();
      })
    });

    if($(".tags ul.actions div").length>0){
      var tagsRoot = $(".tags ul.actions"); 
      $(".tags ul.actions li").each(function(i, el){
        $(el).appendTo(tagsRoot);
      });
      $(".tags ul.actions div").remove();
    }

    //Search query
    var searchterms = window.location.search.replace("?","").split("&");
    var term;
    for(var i=0,z=searchterms.length;i<z;i++){
      term = searchterms[i].split("=");
      if(term[0]==="q"){
        $("#q").val(decodeURIComponent(term[1]));
        break;
      }
    }

  })



  search.start();
}

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return title;
  //return '<h5>' + title + '</h5>';
}