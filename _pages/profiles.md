---
layout: page
title: profiles
permalink: /profiles/
description: Cleveland Rocs Player Profiles
nav: false
display_categories: [profiles, players]
horizontal: false
---

<!-- pages/profiles.md -->
<div class="profiles">
{% if site.enable_profile_categories and page.display_categories %}
  <!-- Display categorized profiles -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>

  <div class="row row-cols-1 row-cols-md-3">
    {% for profile in sorted_profiles %}
      {% include profiles.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display profiles without categories -->

{% assign sorted_profiles = site.profiles | sort: "importance" %}

  <!-- Generate cards for each profile -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for profile in sorted_profiles %}
      {% include profiles_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for profile in sorted_profiles %}
      {% include profiles.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
