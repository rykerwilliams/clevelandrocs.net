---
layout: page
permalink: /authors/
title: Authors
---

<p>This page lists authors and their posts. Click an author to jump to their section.</p>

<div class="authors-index">
  {% comment %} Build a flat list of author names from site.posts, then uniq+sort {% endcomment %}
  {% assign author_names_raw = "" %}
  {% for post in site.posts %}
    {% if post.author %}
      {% assign names = post.author | split: '||' %}
    {% elsif post.authors %}
      {% assign names = post.authors %}
    {% else %}
      {% assign names = null %}
    {% endif %}

    {% if names %}
      {% for nm in names %}
        {% assign nm = nm | strip %}
        {% assign author_names_raw = author_names_raw | append: nm | append: '||' %}
      {% endfor %}
    {% endif %}

{% endfor %}

{% assign authors = author_names_raw | split: '||' | uniq | sort %}

{% for name in authors %}
{% if name != '' %}
{% assign slug = name | slugify %}

<section id="{{ slug }}" class="author-section">
<h2>{{ name }}</h2>
<ul>
{% for p in site.posts %}
{% assign matches = false %}
{% if p.author %}
{% assign names = p.author | split: '||' %}
{% elsif p.authors %}
{% assign names = p.authors %}
{% else %}
{% assign names = null %}
{% endif %}
{% if names %}
{% for nm in names %}
{% assign nm_str = nm | strip %}
{% if nm_str == name %}
{% assign matches = true %}
{% endif %}
{% endfor %}
{% endif %}
{% if matches %}
<li><a href="{{ p.url | relative_url }}">{{ p.title }}</a> <small class="text-muted">({{ p.date | date: '%Y-%m-%d' }})</small></li>
{% endif %}
{% endfor %}
</ul>
</section>
{% endif %}
{% endfor %}

</div>
