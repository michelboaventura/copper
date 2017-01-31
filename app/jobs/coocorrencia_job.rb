class CoocorrenciaJob < ApplicationJob
  queue_as :default

  def perform(path)
    min_support = 50
    IO.popen([
      Rails.root.join('algorithms', 'coocorrencia', 'run_coocorrencia.sh').to_s,
      path.join('comments.json').to_s,
      min_support.to_s
    ]) do |io|
      File.open(File.join(path, 'coocorrencia'), 'w') do |f|
        f << io.read
      end
    end
    build_coocorrencia_json(path)
  end

  private

  def build_coocorrencia_json(path)
    out = {
      nodes: Set.new,
      links: []
    }
    nodes = {}

    file = File.open(File.join(path, 'coocorrencia'), 'r')

    file.each_line do |line|
      break if line == "FREQ\n"

      src, target, value = line.strip.split(" ")
      out[:links] << {source: src, target: target, value: value, weight: value}
    end

    file.each_line do |line|
      break if line == "NEIG\n"

      el, acc = line.strip.split(" ")

      nodes[el] = {}
      nodes[el][:acc] = acc
    end

    file.each_line do |line|
      els = line.chomp.split(" ")
      el = els.delete_at(0)

      nodes[el][:neigh] = els.inject({}) {|acc, el| acc[el] = true; acc}
    end

    nodes.each_pair do |el, value|
      out[:nodes] << json_coocorrencia(el, value[:acc], value[:neigh])
    end

    File.open(File.join(path, 'graph-canvas.json'), 'w') do |f|
      f << out.to_json
    end
  end

  def json_coocorrencia(el, count, neigh)
    {
      id: el,
      name: el,
      attrs: {},
      metric: count,
      group: "",
      community: 0,
      neighbours: neigh
    }
  end
end
