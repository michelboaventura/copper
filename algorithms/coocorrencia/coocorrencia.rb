#!/usr/bin/env ruby

require 'set'

words = []
uniq = Set.new
min_sup = ARGV[0] ? ARGV[0].to_i : 100
hash = {}
inverse_hash = {}

STDIN.each_line do |line|
  line = line.gsub(/[^\p{Word} ]/,' ').gsub('  ', ' ').downcase.strip
  txt = line.split(" ").uniq.select{|el| el.size > 3}.sort
  words << txt
  uniq.merge(txt)
end

count = uniq.count

uniq.each_with_index do |w, i|
  hash[w] = i
  inverse_hash[i] = w
end

out = Array.new(count) { Array.new(count, 0) }

words.each do |line|
  0.upto(line.count - 2) do |i|
    (i + 1).upto(line.count - 1) do |j|
      id1 = hash[line[i]]
      id2 = hash[line[j]]
      out[id1][id2] += 1
    end
  end
end

0.upto(count - 2) do |i|
  (i + 1).upto(count - 1) do |j|
    next if out[i][j] < min_sup
    puts [inverse_hash[i], inverse_hash[j], out[i][j]].join(" ")
  end
end
