class PartItemJob < ApplicationJob
  queue_as :default

  def perform(path)
    min_support = 50
    IO.popen([
      Rails.root.join('algorithms', 'part_item', 'run_part_item.sh').to_s,
      path.join('comments.json').to_s,
      min_support.to_s
    ]) do |io|
      File.open(File.join(path, 'part_item'), 'w') do |f|
        f << io.read
      end
    end
    build_part_item_json(path)
  end

  private

  def build_part_item_json(path)
    out = {
      nodes: Set.new,
      links: []
    }
    nodes = {}

    file = File.open(File.join(path, 'part_item'), 'r')

    file.each_line do |line|
      break if line == "FREQ\n"

      src, target, value = line.strip.split("|")
      out[:links] << {source: src, target: target, value: value, weight: value}
    end

    file.each_line do |line|
      break if line == "NEIG\n"

      el, color, shape, acc = line.strip.split("|")

      nodes[el] = {}
      nodes[el][:acc] = acc
      nodes[el][:color] = color
      nodes[el][:shape] = shape
    end

    file.each_line do |line|
      els = line.chomp.split("|")
      el = els.delete_at(0)

      nodes[el][:neigh] = els.inject({}) {|acc, el2| acc[el2] = true; acc}
    end

    nodes.each_pair do |el, value|
      out[:nodes] << json_part_item(el, value)
    end

    File.open(File.join(path, 'graph-canvas.json'), 'w') do |f|
      f << out.to_json
    end
  end

  def json_part_item(el, value)
    {
      id: el,
      name: el,
      attrs: {},
      metric: value[:acc],
      shape: value[:shape],
      group: value[:color],
      community: 0,
      neighbours: value[:neigh]
    }
  end
end
