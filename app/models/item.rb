class Item < ActiveRecord::Base
  attr_accessible :label, :payment_type, :payment_unit, :time

  validates :time, :presence => true

  before_validation :setup

  def setup
    self.time = 0 if(self.time.nil?)
  end

  def self.clean_all_items
    unless Item.count > 10000
      Item.all.each do |item|
        unless item.save
          puts "We erase item with id=#{item.id}"
          item.delete # If there is a problem : we erase !
        end
      end
    end
  end

  def secondes_to_string
    s, m, h = self.time, 0, 0
    if s>59
      s = s%60
      m = (self.time - (s))/60
      if m>59
        h = (m-(m%60))/60
        m = m%60
      end
    end

    "#{simple_display(h)}:#{simple_display(m)}:#{simple_display(s)}"
  end

  def simple_display(t)
    if t>10
      t
    else
      "0#{t}"
    end
  end

end
