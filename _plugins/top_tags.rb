# frozen_string_literal: true
# Plugin to compute tag frequencies once and expose as site.top_tags (sorted desc)
# Avoids heavy Liquid logic in include.
module Jekyll
  class TopTagsGenerator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      counts = Hash.new(0)
      site.posts.docs.each do |post|
        Array(post.data['tags']).each do |tag|
          norm = tag.to_s.strip.downcase
          counts[norm] += 1 unless norm.empty?
        end
      end
      sorted = counts.map { |name, count| { 'name' => name, 'count' => count } }
                     .sort_by { |h| -h['count'] }
      site.config['top_tags'] = sorted # allow access via site.config for GitHub Pages safety
      site.singleton_class.class_eval { attr_accessor :top_tags }
      site.top_tags = sorted
    end
  end
end
