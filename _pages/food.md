---
layout: page
title: food
permalink: /food/
description: A growing collection of gastronomic proportions.
nav: true
nav_order: 3
display_categories: [food]
horizontal: false
---

<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized food -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% if site.food %}
    {% assign all_food = site.food %}
  {% else %}
    {% assign all_food = "" | split: "," %}
  {% endif %}
  {% assign categorized_food = all_food | where: "category", category %}
  {% assign sorted_food = categorized_food | sort: "importance" %}
  <!-- Generate cards for each event -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for event in sorted_food %}
      {% include food_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for event in sorted_food %}
      {% include food.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display food without categories -->

{% if site.food %}
{% assign all_food = site.food %}
{% else %}
{% assign all_food = "" | split: "," %}
{% endif %}
{% assign sorted_food = all_food | sort: "importance" %}

  <!-- Generate cards for each event -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for event in sorted_food %}
      {% include food_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for event in sorted_food %}
      {% include food.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
