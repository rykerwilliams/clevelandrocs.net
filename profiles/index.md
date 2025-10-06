---
layout: page
title: profiles
permalink: /profiles/
description: A directory of player profiles.
---

<div class="profiles-index">
  <p>This page lists all player profiles. Click a profile to view the full bio.</p>
  <div class="list-group">
    {% assign profile_pages = site.pages | where_exp: "p", "p.url != '/profiles/' and p.url contains '/profiles/'" | sort: 'title' %}
    {% for p in profile_pages %}
      <a class="list-group-item list-group-item-action" href="{{ p.url }}">{{ p.title }}</a>
    {% endfor %}
  </div>
</div>
