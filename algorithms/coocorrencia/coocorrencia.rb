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

min_sup = words.count <= 200 ? 2 : min_sup

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

freq = Hash.new {|h,k| h[k] = 0}
neig = Hash.new {|h,k| h[k] = Set.new}

0.upto(count - 2) do |i|
  (i + 1).upto(count - 1) do |j|
    next if out[i][j] < min_sup

    el1 = inverse_hash[i]
    el2 = inverse_hash[j]
    puts [el1, el2, out[i][j]].join(" ")

    freq[el1] += 1
    freq[el2] += 1

    neig[el1] << el2
    neig[el2] << el1
  end
end

puts "FREQ"

freq.each_pair do |el, acc|
  puts [el, acc].join(" ")
end

puts "NEIG"

neig.each_pair do |el, neighs|
  puts ([el] + neighs.to_a).join(" ")
end
