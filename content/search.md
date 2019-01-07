+++
date        = "2019-01-05"
title       = "Buscador"
description = ""
no_index 	= true
+++

<div class="column hidden-xs ">
	<p id="stats" class="txt_result count_resultats"></p>	
</div>

<div class="row search">
	<!--div class="col-3 col-12-small" style="border:1px solid red">
		<div id="tags" class="facet"></div>
	</div-->
	<div id="hits" class="col-12 col-12-small">
	</div>
</div>

<div class="footer_pagination col-12">

</div>

<img src="/images/algolia-powered-by.svg" />

<!-- TEMPLATES -->
<script type="text/html" id="hit-template">
		<div class="row">
			{{#hasMedia}}
			<div class="col-8 col-12-small">
			{{/hasMedia}}
			{{^hasMedia}}
			<div class="col-12 col-12-small">
			{{/hasMedia}}
				<h3><a href="{{path}}">{{{_highlightResult.title.value}}}</a></h3>
				<p>
					{{#content}}
					{{{_snippetResult.content.value}}} [...]
					{{/content}}

					{{^content}}
					{{{_snippetResult.description.value}}}
					{{/content}}
				</p>
			</div>
			{{#hasMedia}}
			<div class="col-4 col-12-small search-image-container">
				{{#image}}
					<span data-src="{{path}}/index.json"></span>
				{{/image}}
				
				{{#youtube}}
					<iframe class="youtube col-4" style="height:281!important" 
							allowfullscreen="allowfullscreen"
							mozallowfullscreen="mozallowfullscreen" 
							msallowfullscreen="msallowfullscreen" 
							oallowfullscreen="oallowfullscreen" 
							webkitallowfullscreen="webkitallowfullscreen"
							src="{{youtube}}">
					</iframe>
				{{/youtube}}
			</div>
			{{/hasMedia}}
		</div>
		<hr />

</script>

<script type="text/html" id="tag-template">
	<li>
		<a href="{{ url }}" class="button small">{{ name }} 
			({{count}})
		</a>
	</li>
</script>

<script type="text/html" id="no-results-template">
	<div id="no-results-message">
	  <p>No se han encontrado resultados para la búsqueda <em>"{{query}}"</em>.</p>
	  <!--a href="." class='clear-all'>Neteja la cerca</a-->
	</div>
</script>

<script type="text/html" id="stats-template">
  Se han encontrado <b>{{nbHits}}</b> resultados
  <hr />
</script>
<!-- /TEMPLATES -->

<!--<div id="logo-algolia"> -->
	<!-- <img src="/images/algolia/Algolia_logo_bg-white.jpg" alt="Logo Algolia" /> -->
<!--</div> -->

<script src="https://cdn.jsdelivr.net/npm/algoliasearch@3.27.1/dist/algoliasearchLite.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@2.10.2/dist/instantsearch.min.js"></script>