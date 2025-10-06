---
layout: page
title: Jane Doe
permalink: /profiles/jane/
---

{% capture content %}{% include profiles/profile-jane.md %}{% endcapture %}
{{ content | markdownify }}
