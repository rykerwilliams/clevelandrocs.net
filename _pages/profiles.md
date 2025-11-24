---
layout: page
title: profiles
permalink: /profiles/
description: Cleveland Rocs Player Profiles
nav: true
nav_order: 1
display_categories: [profiles]
horizontal: false
toc:
  sidebar: left
---

{% assign sorted_profiles = site.profiles | sort: "title" %}
{% if sorted_profiles == empty %}
{% assign sorted_profiles = site.pages | where_exp: "p", "p.url contains '/profiles/' and p.url != '/profiles/' and p.url != '/profiles/index.html'" | sort: "title" %}
{% endif %}

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
      {% for profile in sorted_profiles %}
        {% include profiles.liquid profile=profile %}
      {% endfor %}
    </div>
  </div>
{% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for profile in sorted_profiles %}
      {% include profiles.liquid profile=profile %}
    {% endfor %}
  </div>
{% endif %}
