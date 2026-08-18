---
layout: default
permalink: /formats/
title: formats
nav: true
nav_order: 2
---

<div class="post">

  <h1>Formats</h1>
  <p class="text-muted">Browse the format pages below for structure, card pool, and community rules.</p>

{% assign formatlist = site.formats %}

  <ul class="post-list">
    {% for format in formatlist %}
      <li>
        <h3>
          <a class="post-title" href="{{ format.url | relative_url }}">{{ format.title }}</a>
        </h3>
        {% if format.description %}
          <p>{{ format.description }}</p>
        {% endif %}
        {% if format.date %}
          <p class="post-meta">
            {{ format.date | date: '%B %d, %Y' }}
            {% if format.external_source %}
              &nbsp; &middot; &nbsp; {{ format.external_source }}
            {% endif %}
          </p>
        {% endif %}
      </li>
    {% endfor %}
  </ul>

</div>
