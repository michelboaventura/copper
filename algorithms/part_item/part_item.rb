#!/usr/bin/env ruby

require 'set'

graph           = Hash.new {|h,k| h[k] = 0}
part_graph      = Hash.new {|h,k| h[k] = 0}
item_graph      = Hash.new {|h,k| h[k] = 0}
part_neig_graph = Hash.new {|h,k| h[k] = Set.new}
item_neig_graph = Hash.new {|h,k| h[k] = Set.new}

STDIN.each do |line|
  part, item = line.strip.split("|")
  part_graph[part] += 1
  item_graph[item] += 1
  graph[[part, item]] += 1
  part_neig_graph[part] << item
  item_neig_graph[item] << part
end

graph.each_pair do |part_item, count|
  puts (part_item + [count]).join("|")
end

puts "FREQ"

part_graph.each_pair do |part, count|
  puts [part, "Participante", "diamond", count].join("|")
end

item_graph.each_pair do |item, count|
  puts [item, "Item", "circle", count].join("|")
end

puts "NEIG"

part_neig_graph.each_pair do |part, neighs|
  puts ([part] + neighs.to_a).join("|")
end

item_neig_graph.each_pair do |item, neighs|
  puts ([item] + neighs.to_a).join("|")
end
