module Jekyll
  module HaversineFilter
    EARTH_RADIUS_MILES = 3958.8

    def haversine_miles(lat1, lon1, lat2, lon2)
      lat1_f = lat1.to_f
      lon1_f = lon1.to_f
      lat2_f = lat2.to_f
      lon2_f = lon2.to_f

      dlat = to_radians(lat2_f - lat1_f)
      dlon = to_radians(lon2_f - lon1_f)

      a = Math.sin(dlat / 2)**2 +
          Math.cos(to_radians(lat1_f)) * Math.cos(to_radians(lat2_f)) *
          Math.sin(dlon / 2)**2

      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      (EARTH_RADIUS_MILES * c).round
    end

    private

    def to_radians(degrees)
      degrees * Math::PI / 180.0
    end
  end
end

Liquid::Template.register_filter(Jekyll::HaversineFilter)